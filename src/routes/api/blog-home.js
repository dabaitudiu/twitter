/**
 * @description indes api route
 * @author Zhenhan Li
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const { genValidator } = require('../../middlewares/validator')
const blogValidator = require('../../validator/blog')

router.prefix('/api/blog')

// create tweet
router.post('/create', loginCheck, genValidator(blogValidator),async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo

    // controller 
    ctx.body = await create({ userId, content, image })

})

module.exports = router