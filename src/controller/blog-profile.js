/**
 * @description personal home page controller
 * @author Zhenhan Li
 */


const { getBlogListByUser} = require('../service/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')

/**
  * retrieve personal page tweets list
  * @param {string} userName username
  * @param {number} pageIndex current page
  */
async function getProfileBlogList(userName, pageIndex = 0) {

    console.log('controller: ', userName)
    // service
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })

    const blogList = result.blogList

    // concatenate return data
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })

}

module.exports = {
    getProfileBlogList
}