const postResolvers = require('./posts')
const userResolvers = require('./users')
const commentResolvers = require('./comments')

const resolvers = {
    Post: {
        commentCount(parent) {
            return parent.comments.length
        }
    },
    Query: {
        ...postResolvers.Query
        
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}

module.exports = resolvers