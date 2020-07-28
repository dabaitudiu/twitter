/**
 * @description sign in validation middleware
 * @author Zhenhan Li
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API sign in validation
 * @param {Object} ctx 
 * @param {*} next 
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // already signed in
        await next()
        return
    }

    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // already signed in
        await next()
        return
    }

    const curUrl = ctx.url 
    ctx.redirect('./login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}