const express = require('express')
const { ApolloServer } = require('apollo-server-express')
import schema from './lib/graphql/schema'
import config from './lib/config'
import { createServer } from 'http'
import OsrmAPI from './lib/datasources/osrm'
import { droneStatus } from './lib/services/droneStatus'
import bodyParser from 'body-parser'

import { verifyTokenAgainstUserRecords } from './lib/services/auth'

export const osrmInstance = new OsrmAPI()

export const serverConfig = {
  context: async ({ req }: any) => {
    try {
      const token = req.headers.authorization || ''

      if (token) {
        const user = await verifyTokenAgainstUserRecords(
          token,
          config.JWT_SECRET.publicKey
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
    osrm: osrmInstance,
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

app.post('/status', droneStatus)

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
