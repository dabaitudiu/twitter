/**
 * @description user api route
 * @author Zhenhan Li
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
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

// login
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    // controller 
    ctx.body = await login(ctx, userName, password)

})

module.exports = router
