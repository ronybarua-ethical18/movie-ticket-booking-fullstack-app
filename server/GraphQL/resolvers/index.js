const userResolvers = require("./users");
const movieResolvers = require('./movies')
const commentResolvers = require('./comments')
module.exports = {
  Movie: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...movieResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...movieResolvers.Mutation,
    ...commentResolvers.Mutation
  }
};