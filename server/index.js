const { ApolloSever } = require('apollo-server')
const { mongoose } = require('mongoose')


const server = new ApolloServer({

    context: ({req}) => ({req}) 
})

