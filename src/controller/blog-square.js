/**
 * @description 广场页 controller
 * @author Zhenhan Li
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * retrieve square tweet list
 * @param {number} pageIndex pageIndex
 */
async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const blogList = result.blogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getSquareBlogList
}