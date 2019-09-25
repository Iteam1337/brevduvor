import passport from 'passport'
import { sign, verify } from 'jsonwebtoken'
import { Strategy as LocalStrategy } from 'passport-local'

const JWT_SECRET = 'MY SUPER SECRET KEY'

/** DUMMY IMPLEMENTATION OF USER RECORDS */
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

/* END DUMMY IMPLEMENTATION OF USERS*/

export const login = (req: any, res: any, next: any) => {
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
}

export const verifyTokenAgainstUserRecords = (token: string) =>
  new Promise((resolve, reject) => {
    try {
      token = token.split('Bearer ')[1]

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

export const registerPassport = () => {
  // Configure passport
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
}
