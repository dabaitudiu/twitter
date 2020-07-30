/**
 * @description tweet data-related tool and method
 * @author Zhenhan Li
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// retrieve blog-list.ejs contents
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString() 

/**
 * based on blogList, render html string
 * @param {Array} blogList tweet list
 * @param {boolean} canReply if can reply
 */
function getBlogListStr(blogList = [], canReply = false) {
    const res = ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
    return res
}

module.exports = {
    getBlogListStr
}