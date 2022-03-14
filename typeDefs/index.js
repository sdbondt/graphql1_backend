const { gql } = require('apollo-server')

const typeDefs = gql`
    type Comment {
        id: ID!
        body : String!
        username: String!
    }

    type Post {
        id: ID!
        body: String!
        username: String!
        comments: [Comment]!
        commentCount: Int!
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query {
        sayHi: String!
        getPosts: [Post]!
        getPost(postId: ID!): Post
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Comment!
        deleteComment(postId: String!, commentId: ID!): Post!
    }
`

module.exports = typeDefs