const { gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    id: Int
    text: String
    done: Boolean
    userId: Int
    user: User
    users: [User]
  }

  type User {
    id: Int!
    username: String
    password: String
    todos: [Todo]
    todo: Todo
  }

  type Query {
    todos: [Todo]
    todo(id: Int!): [Todo]
    users: [User]
    user(id: Int!): [User]
  }

  type Mutation {
    addUser(username: String, password: String): User
    addTodo(text: String): Todo
    deleteUser(id: Int): User
    deleteTodo(id: Int): Todo
    updateTodo(id: Int, text: String, done: Boolean): Todo
  }
`;

module.exports = { typeDefs };

// addTodo(text: String, done: Boolean, userId: Int): Todo
