/**
 * @description tweet service
 * @author Zhenhan Li
 */

const { Blog, User, UserRelation } = require('../db/model/index') 
const { formatUser, formatBlog } = require('./_format')

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

/**
 * get blog list parameters according to user
 * @param {Object} param0 blog list parameters
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10}) {
    // query condition
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }
    // execute query
    const result = await Blog.findAndCountAll({
        limit: pageSize, // how many tweets per page
        offset: pageSize * pageIndex, // jump over how many tweets
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    // result.count is the total numbers
    // result.rows query result, array list

    // retrieve dataValues
    let blogList = result.rows.map(row => row.dataValues)

    // format
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
} 

/**
 * get following list
 * @param {Object} param0 
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: { userId }
            }
        ]
    })

    // 格式化数据
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}