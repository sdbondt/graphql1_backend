require('dotenv').config()
const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")
const typeDefs = require('./typeDefs/index.js')
const resolvers = require('./resolvers/index')
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // dit gebruiken om in utils/auth onze user uit req.headers te halen
    context: ({ req }) => ({ req })
})

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })

