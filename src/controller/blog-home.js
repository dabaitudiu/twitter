/**
 * @description index controller
 * @author Zhenhan Li
 */

const { createBlog, getFollowersBlogList } = require('../service/blog')
const { SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const xss = require('xss')
const { PAGE_SIZE } = require('../conf/constant')

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
            content: xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * get twitter home page
 * @param {num} userId user's id
 * @param {number} pageIndex page idex
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}