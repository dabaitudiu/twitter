/**
 * @description index controller
 * @author Zhenhan Li
 */

const { createBlog } = require('../service/blog')
const { SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
  * create tweet
  * @param {Object} param0 data that tweet needs
  */
async function create({ userId, content, image }) {
    // service layer
    try {
        // create tweet
        const blog = await createBlog({
            userId,
            content,
            image
        })
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}