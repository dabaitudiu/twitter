/**
 * @description user controller
 * @author Zhenhan Li
 */

const { getUserInfo } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')


/**
  * whether user exists
  * @param {string} userName user's name
  */
async function isExist(userName) {
    // call services layer to retrieve data
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
        // {errno: 0, data: {...}}
    } else {
        // if userInfo == null -> user not found / user not exist
        return new ErrorModel(registerUserNameNotExistInfo)
        // {errno: 10003, message: 'username not exist.'}
    }
}

module.exports = {
    isExist
}