import gql from "graphql-tag";

const typeDefs = gql`
  scalar DateTime

  input RegisterInput {
    username: String
    email: String!
    password: String!
    language: String
  }

  input LoginInput {
    emailOrUsername: String!
    password: String!
  }

  input LoginGoogleInput {
    email: String!
    googleId: String!
    name: String
    photo: String
    language: String
  }

  input UpdateUserInput {
    id: String!
    username: String
    name: String
    photoBase64: String
    language: String
  }

  input ResetPasswordInput {
    emailOrUsername: String!
  }

  type User {
    id: ID
    email: String!
    username: String!
    isTemporalPassword: Boolean
    createdAt: DateTime!
    googleId: String
    token: String
    language: String
    name: String
    photo: String
    hasPassword: Boolean
  }

  type Mutation {
    registerUser(registerInput: RegisterInput!): User
    loginUser(loginInput: LoginInput!): User
    loginGoogleUser(loginGoogleInput: LoginGoogleInput!): User
    updateUser(updateUserInput: UpdateUserInput!): User
    updatePassword(oldPassword: String!, newPassword: String!): Boolean
    resetPassword(resetPasswordInput: ResetPasswordInput!): Boolean
  }

  type Query {
    user(id: String!): User
    verifyToken: Boolean
  }
`;
export default typeDefs;
