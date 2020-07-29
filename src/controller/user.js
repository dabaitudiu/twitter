/**
 * @description user controller
 * @author Zhenhan Li
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
    registerUserNameNotExistInfo, 
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
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

/**
 * modify personal info
 * @param {Object} ctx 
 * @param {string} nickName
 * @param {string} city
 * @param {string} picture 
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo 
    if (!nickName) {
        nickName = userName
    }
    // service
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    )
    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        }) 
        return new SuccessModel()
    }

    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 
 * @param {string} userName user's name
 * @param {string} password password
 * @param {string} newPassword new password
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser(
        { newPassword: doCrypto(newPassword) },
        { 
            userName,
            password: doCrypto(password)
        }
    )
    if (result) {
        // success
        return new SuccessModel()
    }

    // fail
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * logout
 * @param {Object} ctx 
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurrentUser, 
    changeInfo,
    changePassword,
    logout
}