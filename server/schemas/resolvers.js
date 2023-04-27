const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if(context.user) {
        const userData = await.User.findOne({_id: context.user._id})
        .select('-__v - password')
        return userData;
      }
      throw new AuthenticationError("Must log in");
    }
  },

  Mutation: {
    login: async(parent, {email, password}) => {
      const user = await User.findOne({email});

      if (!user) {
        throw new AuthenticationError("Invalid email");
      }

      
    }
  }
}

module.exports = resolvers;