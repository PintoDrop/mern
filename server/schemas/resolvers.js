const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if(context.user) {
        const userData = await User.findOne({_id: context.user._id})
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

      const validPass = await user.isValidPassword(password);

      if (!validPass) {
        throw new AuthenticationError("Invalid password");
      }
      
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signtoken(user);

      return {token, user};
    },

    saveBook: async (parent, {input}, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$addToSet: {savedBooks: input}},
          {new:true}
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please make sure you are logged in");
    },

    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: {savedBooks: {bookId: args.bookId}}},
          {new: true}
        );
        return updatedUser
      }
      throw new AuthenticationError("Please make sure you are logged in")
    }
  }
};

module.exports = resolvers;