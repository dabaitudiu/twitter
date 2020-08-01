/**
 * @description personal index api route
 * @author Zhenhan Li
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unFollow } = require('../../controller/user-relation')

router.prefix('/api/profile')

// load more 
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex)

    // render to html string
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

// follow
router.post('/follow', loginCheck, async (ctx, next) => {
    const { id: myuserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body 

    // controller 
    ctx.body = await follow(myuserId, curUserId)
})

// unfollow
router.post('/unFollow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router