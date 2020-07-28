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

module.exports = {
    getUserInfo,
    createUser
}