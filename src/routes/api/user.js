/**
 * @description user api route
 * @author Zhenhan Li
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurrentUser, changeInfo } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

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

// delete
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        // test env, test account delete himself
        const { userName } = ctx.session.userInfo
        // call controller delete
        ctx.body = await deleteCurrentUser(userName)
    }
})

// modify personal info
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    // controller 
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

module.exports = router
