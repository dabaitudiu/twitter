/**
 * @description error 404 router
 * @author Zhenhan Li
 */

const router = require('koa-router')()

// error
router.get('/', async (ctx, next) => {
    await ctx.render('error')
})

// 404
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router