/**
 * @description user api route
 * @author Zhenhan Li
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')


router.prefix('/api/user')

// register route
router.post('/register', async (ctx, next) => {

})

// whether user exists
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router
