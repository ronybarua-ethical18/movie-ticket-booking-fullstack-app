const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    isAdmin: Boolean!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Movie {
    id: ID!
    title: String!
    imgTitle: String!
    desc: String!
    trailer: String!
    video: String!
    year: String!
    genre: String!
    isSeries: Boolean
    createdAt: String!
  }

  input MovieInput {
    title: String!
    img: String!
    imgTitle: String!
    desc: String!
    trailer: String!
    video: String!
    year: String!
    genre: String!
    limit: Int!
    isSeries: Boolean
  }

  type Query{
    getUsers: [User]
    getMovies: [Movie]
    getMovie(movieId: ID!): Movie!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    addMovie(movieInput: MovieInput): Movie!
  }
`;
