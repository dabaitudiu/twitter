/**
 * @description user api route
 * @author Zhenhan Li
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')


router.prefix('/api/user')

// register route
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body 
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

// whether user exists
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router
