/**
 * @description tweet view route
 * @author Zhenhan Li
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// index
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

module.exports = router

