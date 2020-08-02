/**
 * @description index controller
 * @author Zhenhan Li
 */

const { createBlog, getFollowersBlogList } = require('../service/blog')
const { SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const xss = require('xss')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../service/user')
const { createAtRelation } = require('../service/AtRelation')

/**
  * create tweet
  * @param {Object} param0 data that tweet needs
  */
async function create({ userId, content, image }) {
    // collect and analyze @users in the content 
    // content format: 'hi there @ciri - ciri2020; hello @aa - aa2020 '
    const atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            // dest is not replace but userName
            atUserNameList.push(userName)
            return matchStr // replace not working
        }
    )

    // get user info through @
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )

    // get user id by user info
    const atUserIdList = atUserList.map(user => user.id)




    // service layer
    try {
        // create tweet
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })

        // 创建 @ 关系
        await Promise.all(atUserIdList.map(
            userId => createAtRelation(blog.id, userId)
        ))
        
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