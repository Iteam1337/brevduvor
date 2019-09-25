const express = require('express')
const { ApolloServer } = require('apollo-server-express')
import schema from './lib/graphql/schema'
import config from './lib/config'
import { createServer } from 'http'
import OsrmAPI from './lib/datasources/osrm'
import { droneStatus } from './lib/services/droneStatus'
import bodyParser from 'body-parser'

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
// import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = 'MY SUPER SECRET KEY'

type User = {
  id: number
  name: string
  password: string
}

class Users {
  private registered: User[] = [
    {
      id: 1,
      name: 'Kalle',
      password: 'hunter2',
    },
    {
      id: 2,
      name: 'Kenta',
      password: 'password123',
    },
    {
      id: 3,
      name: 'Svin-Robban',
      password: '213Hkldsfjy234Fjjklfd^^^^*',
    },
  ]

  async find(username: string, callback: (err: any, user: any) => void) {
    try {
      const found = this.registered.find(user => user.name === username)
      if (found) {
        return callback(null, found)
      } else {
        return callback(null, null)
      }
    } catch (error) {
      return callback(error, null)
    }
  }

  async findById(id: number, callback: (err: any, user: any) => void) {
    try {
      const found = this.registered.find(user => user.id === id)
      if (found) {
        return callback(null, found)
      } else {
        return callback(null, null)
      }
    } catch (error) {
      return callback(error, null)
    }
  }
}

const usersDb = new Users()

// Configure passport strategies
passport.use(
  new LocalStrategy({}, (username: string, password: string, cb: any) => {
    usersDb.find(username, (err: any, user: any) => {
      if (err) {
        return cb(err)
      }

      if (!user || user.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password' })
      }

      return cb(null, user, { message: 'Logged in successfully' })
    })
  })
)

const verifyTokenAgainstUserRecords = (token: string) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = verify(token, JWT_SECRET) as User

      usersDb.findById(payload.id, (err: any, user: any) => {
        if (err) {
          reject(err)
        }
        if (!user || user.password !== payload.password) {
          reject(err)
        }

        resolve(user)
      })
    } catch (error) {
      reject(error)
    }
  })
}

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: JWT_SECRET,
//     },
//     (payload, cb) => {
//       console.log('-->', payload)

//       usersDb.findById(payload.id, (err: any, user: any) => {
//         if (err) {
//           return cb(err)
//         }
//         if (!user || user.password !== payload.password) {
//           return cb(null, false, { message: 'Invalid token' })
//         }

//         return cb(null, user, { message: 'Authorised' })
//       })
//     }
//   )
// )

passport.serializeUser((user: User, cb: (_: any, userId: number) => void) => {
  cb(null, user.id)
})

passport.deserializeUser(
  (id: number, cb: (error: any, user: User | null) => void) => {
    usersDb.findById(id, (err, user) => {
      if (err) {
        return cb(err, null)
      }

      cb(null, user)
    })
  }
)

export const osrmInstance = new OsrmAPI()
export const serverConfig = {
  context: async ({ req }: any) => {
    console.log(req.headers)
    try {
      const token = req.headers.authorization || ''

      if (token) {
        const user = await verifyTokenAgainstUserRecords(token)

        return { user }
      }
    } catch (error) {
      console.log(error)
    }
  },
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  dataSources: () => ({
    osrm: osrmInstance,
  }),
}

const app = express()

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer(serverConfig)

server.applyMiddleware({ app })

app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/status', droneStatus)

app.post('/login', (req: any, res: any, next: any) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ ...info })
    }

    req.login(user, { session: false }, (err: any) => {
      if (err) {
        return res.status(500).json(err)
      }

      const token = sign(user, JWT_SECRET)
      return res.json({ ...info, token, username: user.name, id: user.id })
    })
  })(req, res, next)
})

app.use('/test', passport.authenticate('jwt', { session: false }), () => {
  app.get('/test', (req: any, res: any) => {
    console.log('/test req -->', req)
    res.json({ message: 'ok' })
  })
})

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

if (process.env.NODE_ENV !== 'test') {
  httpServer.listen({ port: config.PORT || 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${config.PORT}${server.graphqlPath}`,
      `\n📥 Subscriptions ready at ws://localhost:${config.PORT}${server.subscriptionsPath}`
    )
  )
}
