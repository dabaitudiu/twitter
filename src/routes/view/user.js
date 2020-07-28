/**
 * @description user view route
 * @author Zhenhan Li
 */

const router = require('koa-router')()

/**
 * retrieve user info
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false // default not login
    }

    const userInfo = ctx.session.userInfo 
    console.log('userInfo: ', userInfo)
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router