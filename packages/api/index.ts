import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './lib/graphql/schema'
import config from './lib/config'
import { createServer } from 'http'
import FlyPulse from './lib/datasources/flypulse'
import bodyParser from 'body-parser'

import { verifyTokenAgainstUserRecords } from './lib/services/auth'
import { startDroneListener } from './lib/services/drones'

export const serverConfig = {
  context: async ({ req }: any) => {
    if (!req) return
    try {
      const token = req.headers.authorization || ''
      if (token) {
        const user = await verifyTokenAgainstUserRecords(
          token,
          config.JWT_SECRET
        )

        return { user }
      }
    } catch (error) {
      console.log(error)
    }
  },
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  schemaDirectives: schema.directives,
  dataSources: () => ({
    flyPulse: new FlyPulse(),
  }),
}

const app = express()

const server = new ApolloServer(serverConfig)

server.applyMiddleware({ app })

app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

startDroneListener()

if (process.env.NODE_ENV !== 'test') {
  httpServer.listen({ port: config.PORT || 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${config.PORT}${server.graphqlPath}`,
      `\n📥 Subscriptions ready at ws://localhost:${config.PORT}${server.subscriptionsPath}`
    )
  )
}
