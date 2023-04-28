const {gql} = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String
    bookcount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    title: String
    image: String
    link: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  
  input BookInput {
    bookID: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }
  
  type Mutation {
    login(emai: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookID: ID!): User
  }

`;

module.exports = typeDefs;