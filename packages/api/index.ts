import { DronePositionResponse } from './lib/__generated__/brevduvor'
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
import schema from './lib/graphql/schema'
import config from './lib/config'
import { createServer } from 'http'
import pubsub from './lib/adapters/pubsub'

setTimeout(() => {
  const dronePosition = {
    departure: '13',
    eta: 'tja',
    start: {
      lat: 3,
      lon: 4,
    },
    stop: {
      lat: 33,
      ln: 34,
    },
    batteryStatus: 1000,
    currentPos: {
      lat: 1,
      lon: 2,
    },
    bearing: 3,
  } as DronePositionResponse

  pubsub.publish('dronePosition', { dronePosition })
}, 10000)

const app = express()
const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
})
server.applyMiddleware({ app })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: config.PORT || 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${config.PORT}${server.graphqlPath}`,
    `📥 Subscriptions ready at ws://localhost:${config.PORT}${server.subscriptionsPath}`
  )
)
