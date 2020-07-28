/**
 * @description user service
 * @author Zhenhan Li
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * get user info
 * @param {string} userName user's name
 * @param {string} password user's password
 */
async function getUserInfo(userName, password) {
    // query condition
    const whereOpt = {
        userName
    }

    if (password) {
        Object.assign(whereOpt, { password })
    }

    // query
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    if (result == null) {
        // user not found or wrong password/username
        return result
    }

    // format
    const formatResult = formatUser(result.dataValues)

    return formatResult
}

/**
 * create user
 * @param {string} userName  
 * @param {string} password  
 * @param {number} gender  
 * @param {string} nickName  
 */
async function createUser({ userName, password, gender = 3, nickName}) {
    const result = await User.create({
        userName, 
        password,
        nickName: nickName ? nickName: userName,
        gender
    })
    return result.dataValues
}

/**
 * delete user
 * @param {string} userName 
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result is deleted row numbers
    return result > 0
}

/**
 * update user info
 * @param {Object} param0 modifying contents: newPwd, newName, newPic
 * @param {*} param1 query condition:  userName, password
 */
async function updateUser({newPassword, newNickName, newPicture, newCity}, { userName, password }) {

    // concatenate query content
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }

    // concatenate query condition
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    // execute modification
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 // whether modified rows > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}