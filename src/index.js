require("dotenv/config");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server");

// Load graphql modules
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");

// Get database connection
const { connectDb } = require("./database");

// Load all models
const models = require("./database/models");

// Instance of express
const app = express();

// Create Port
const PORT = process.env.PORT || process.env.APP_PORT;

// use Middleware
app.use(cors());
app.use(morgan("dev"));

// Create Apollo server
const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    return { req, connection, models };
  },
});

// The `listen` method launches a web server.
connectDb().then(async () => {
  console.log("Mongodb running up!");
  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Apollo Server on http://localhost:${PORT}/`);
  });
});
