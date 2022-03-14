const { UserInputError, AuthenticationError } = require('apollo-server')
const Post = require('../models/Post')
const checkAuth = require('../utils/auth')

module.exports = {
    Mutation: {
        async createComment(_, { postId, body}, context) {
            try {
                const user = checkAuth(context)
                const post = await Post.findById(postId)
                if (post) {
                    post.comments.unshift({
                        body,
                        username: user.username,

                    })
                    await post.save()
                    return post
                } else {
                    throw new UserInputError('Post not found.')
                }
            } catch (e) {
                throw new Error(e)
            }
        },
        async deleteComment(_, { postId, commentId}, context) {
            try {
                const user = checkAuth(context)
                const post = await Post.findById(postId)

                if (post) {
                    const commentIndex = post.comments.findIndex(c => c.id === commentId)
                    if (post.comments[commentIndex].username === user.username) {
                        post.comments.splice(commentIndex, 1)
                        await post.save()
                        return post
                    } else {
                        throw new AuthenticationError('You are not allowed to delete this comment.')
                    }
                } else {
                    throw new UserInputError('No such post exists.')
                }
            } catch (e) {
                throw new Error(e)
            }
        }
    }
}