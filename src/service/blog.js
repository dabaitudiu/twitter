/**
 * @description tweet service
 * @author Zhenhan Li
 */

const { Blog } = require('../db/model/index') 

/**
 * create tweet
 * @param {Object} param0 
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

module.exports = {
    createBlog
}