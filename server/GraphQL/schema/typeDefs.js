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
    desc: String!
    year: String!
    genre: String!
    duration: String!
    limit: String!
    isSeries: String!
    img: String!
    trailer: String!
    likes: [Like]!
    comments: [Comment]!
    likeCount: Int!
    commentCount: Int!
    createdAt: String!
  }
  type Comment{
    id: ID!
    createdAt:  String!
    username: String!
    body: String!
  }

  type Like{
    id: ID!
    username: String!
    createdAt: String!
  }
  input MovieInput {
    title: String!
    desc: String!
    year: String!
    genre: String!
    duration: String!
    limit: String!
    isSeries: String!
    img: String!
    trailer: String!
  }

  type Query {
    getUsers: [User]
    getMovies: [Movie]
    getMovie(movieId: ID!): Movie!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    addMovie(movieInput: MovieInput): Movie!
    createComment(movieId: ID!, body: String!): Movie!
    deleteComment(movieId: ID!, commentId: ID!): Movie!
    likeMovie(movieId: ID!): Movie!
  }
`;
