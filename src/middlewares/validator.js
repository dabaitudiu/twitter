/**
 * @description json schema validation middleware
 * @author Zhenhan Li
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
  * generate json shcema validation middleware
  * @param {function} validateFn validation function
  */
function genValidator(validateFn) {
    async function validator(ctx, next) {
        // define middleware function
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            // validate fail
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        await next()
    }
    // return middleware
    return validator
}

module.exports = {
    genValidator
}
