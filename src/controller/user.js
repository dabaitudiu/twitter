/**
 * @description user controller
 * @author Zhenhan Li
 */

const { getUserInfo, createUser, deleteUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
    registerUserNameNotExistInfo, 
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')


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

/**
 * 
 * @param {string} userName
 * @param {string} password
 * @param {number} gender (1 male, 2 female, 3 secret)
 */
async function register({ userName, password, gender}) {
    const userInfo = await getUserInfo(userName) 
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
    // sign in successfully, ctx.session.userInfo = xxxx

    // retrieve userinfo
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        // login fail
        return new ErrorModel(loginFailInfo)
    }

    // login successfully
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * delete current user
 * @param {string} userName user's name
 */
async function deleteCurrentUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurrentUser
}