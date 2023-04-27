const { User } = require("../models");

const resolvers = {
  Query: {
    me: async () => {
      return User.
    }
  }
}

module.exports = resolvers;