/**
 * @description user relation service
 * @author Zhenhan Li
 */


const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * retrieve users's followers
 * @param {number} followerId 
 */
async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })
    // result.count: total numbers
    // result.rows: query result (array)

    //format
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

/**
 * retrieve following list
 * @param {number} UserId userId
 */
async function getFollowersByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture']
            }
        ],
        where: {
            userId
        }
    })

    let userList = result.rows.map(row => row.dataValues)
    userList = userList.map(item => {
        let user = item.user.dataValues
        user = formatUser(user)
        return user
    })

    return {
        count: result.count,
        userList
    }
}


/**
 * add relation
 * @param {number} userId user id 
 * @param {number} followerId followed person's id
 */
async function addFollower(userId, followerId) {
    const result = await UserRelation.create({
        userId,
        followerId
    })
    return result.dataValues
}

/**
 * delete relation
 * @param {number} userId user id
 * @param {number} followerId followed user's id
 */
async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result > 0
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowersByUser
}