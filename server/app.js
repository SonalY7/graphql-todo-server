const Sequelize = require("sequelize");
const todoModel = require("./models/todo");
const userModel = require("./models/user");
const { ApolloServer } = require ('apollo-server');
const { typeDefs } = require ("./schema/schema");
const { resolvers } = require ("./resolvers/resolvers")

// const express = require("express");
// const graphqlHTTP = require("express-graphql");
// const schema = require("./schema/schema");
// const app = express();
const sequelize = new Sequelize("todo_development", "todo_admint", "postgres", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// app.use(
//     "/graphql",
//     graphqlHTTP({
//       schema,
//       graphiql: true
//     })
//   );


const user = userModel(sequelize, Sequelize);
const todo = todoModel(sequelize, Sequelize);

user.hasMany(todo);
todo.belongsTo(user);
// {force: true}
sequelize.sync().then(() => {
    // app.listen(8001, () => {
    //     console.log("Listening for requests here at 8001!");
    //   });
    const server = new ApolloServer({ typeDefs, resolvers });
    server.listen().then(({url}) => {
      console.log(`🚀 server ready at ${url}`);
    })
});

module.exports = { todo, user };