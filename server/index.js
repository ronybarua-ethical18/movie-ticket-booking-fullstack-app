const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
// const { MONGODB } = require("./config");
const typeDefs = require("./GraphQL/schema/typeDefs");
const resolvers = require("./GraphQL/resolvers/index");
require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
const PORT = process.env.PORT || 5000;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}

mongoose
  .connect(process.env.MONGODB, connectionParams)
  .then(() => {
    console.log("mongodb connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  })
  .catch((err) => console.log(err));
