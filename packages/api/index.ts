const express = require('express')
const { ApolloServer } = require('apollo-server-express')
import schema from './lib/graphql/schema'
import config from './lib/config'

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: config.PORT || 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${config.PORT}${server.graphqlPath}`
  )
)
