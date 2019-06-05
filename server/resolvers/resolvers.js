const model = require("../models");

const resolvers = {
  Query: {
    todos: () => model.todo.findAll(),
    todo: (parent, args) => model.todo.findAll({ where: { id: args.id } }),
    users: () => model.user.findAll(),
    user: (parent, args) => model.user.findAll({ where: { id: args.id } })
  },
  User: {
    todos(parent, args) {
      return model.todo.findAll({ where: { userId: parent.id } });
    }
  },
  Todo: {
    users(parent, args) {
      return model.user.findAll({ where: { id: parent.userId } });
    }
  },
  Mutation: {
    addUser: (parent, args) =>
      model.user.create({ username: args.username, password: args.password }),
    // addTodo: (parent, args) => model.todo.create({text: args.text, done: args.done, userId: args.userId}),
    addTodo: (parent, args) => model.todo.create({ text: args.text }),

    // deleteUser: (parent, args) =>
    //   model.user.destroy({ where: { id: args.id } }),

    deleteTodo: (parent, args) =>
      model.todo.destroy({ where: { id: args.id } }).then(() => args.id),

    updateTodo: (parent, args) => {
      model.todo
        .update(
          { text: args.text, done: args.done },
          { where: { id: args.id } }
        )
        .then(() => args.text);
    }
  }
};

module.exports = { resolvers };
