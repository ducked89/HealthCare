require("dotenv/config");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server");

// Load graphql modules
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");

// Instance of express
const app = express();

// Create Port
const PORT = process.env.PORT || process.env.APP_PORT;

// use Middleware
app.use(cors());
app.use(morgan("dev"));

const server = new ApolloServer({ introspection: true, typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
