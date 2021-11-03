const userResolvers = require("./users");
const movieResolvers = require('./movies')
module.exports = {
  Query: {
    ...movieResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...movieResolvers.Mutation,
  }
};