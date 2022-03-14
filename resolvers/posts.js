const { AuthenticationError } = require("apollo-server")
const Post = require("../models/Post")
const checkAuth = require('../utils/auth')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            } catch (e) {
                throw new Error(e)
            }
        },
        async getPost(_, {postId}) {
            try {
                const post = await Post.findById(postId)
                if (post) {
                    return post
                } else {
                    throw new Error('Post not found.')
                }
            } catch (e) {
                throw new Error(e)
            }
        },
        
    },
    Mutation: {
        async createPost(_, { body }, context) {
            try {
                const user = checkAuth(context)

                const post = await Post.create({
                    body,
                    user: user.id,
                    username: user.username
                })

                return post
            } catch (e) {
                throw new Error(e)
            }
        },
        async deletePost(_, { postId }, context) {
            try {
                const user = checkAuth(context)
                const post = await Post.findById(postId)
                if (post.username === user.username) {
                    await post.delete()
                    return 'Post has been deleted.'
                } else {
                    throw new AuthenticationError('Action not allowed.')
                }
            } catch (e) {
                throw new Error(e)
            }
        }
    }
}