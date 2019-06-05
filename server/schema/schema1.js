const graphql = require("graphql");
const model = require("../models");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt
} = graphql;

// let todos = [
//   { id: 1, text: "Focus", markedDone: false, userId: 3 },
//   { id: 2, text: "world tour", markedDone: false, userId: 1 },
//   { id: 3, text: "spinning top", markedDone: true, userId: 2 }
// ];

// // let users = [
// //     { id: 1, username: "admint", password: "admint", todoId: 2},
// //     { id: 2, username: "jb", password: "got7", todoId: 3},
// //     { id: 3, username: "nora", password: "nora", todoId: 1}
// // ]


const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLInt },
    text: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    userId: { type: GraphQLInt },
    user: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // return _.find(users, {id: parent.userId});
        return model.user.findAll({ where: { id: parent.userId } });
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    todo: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        // return _.find(todos, {id: parent.todoId});
        return model.todo.findAll({ where: { userId: parent.id } });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuerType",
  fields: {
    todo: {
      type: new GraphQLList(TodoType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // return _.find(todos, { id: args.id });
        return model.todo.findAll({ where: { id: args.id } });
      }
    },
    user: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // return _.find(users, {id: args.id});
        return model.user.findAll({ where: { id: args.id } });
      }
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        // return todos
        return model.todo.findAll();
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // return users
        return model.user.findAll();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return model.user.create({
          username: args.username,
          password: args.password
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});