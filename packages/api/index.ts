const express = require('express')
const { ApolloServer } = require('apollo-server-express')
import schema from './lib/graphql/schema'
import config from './lib/config'
import { createServer } from 'http'
import OsrmAPI from './lib/datasources/osrm'
import { droneStatus } from './lib/services/droneStatus'
import bodyParser from 'body-parser'

const app = express()
const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  dataSources: () => ({
    osrm: new OsrmAPI(),
  }),
})

server.applyMiddleware({ app })

app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/status', droneStatus)

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: config.PORT || 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${config.PORT}${server.graphqlPath}`,
    `\n📥 Subscriptions ready at ws://localhost:${config.PORT}${server.subscriptionsPath}`
  )
)
