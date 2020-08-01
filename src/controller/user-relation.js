/**
 * @description user relation controller
 * @author Zhenhan Li
 */


const { 
    getUsersByFollower, 
    addFollower, 
    deleteFollower,
    getFollowersByUser } = require('../service/user-relation')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const {addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')


/**
 * get fans list according to user userid
 * @param {number} userId user id
 */
async function getFans(userId) {
    // service
    const { count, userList } = await getUsersByFollower(userId)

    // return
    return new SuccessModel({
        count,
        userList
    })
}

/**
 * get following list
 * @param {number} userId userId
 */
async function getFollowers(userId) {
    // services
    const { count, userList } = await getFollowersByUser(userId)

    return new SuccessModel({
        count, 
        followersList: userList 
    })
}

/**
 * 
 * @param {number} myUserId current logged in user id
 * @param {number} curUserId user that will be followed id
 */
async function follow(myUserId, curUserId) {
    //service 
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (ex) {
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * unfollow
 * @param {number} myUserId userid
 * @param {number} curUserId current user id
 */
async function unFollow(myUserId, curUserId) {
    //service 
    const result = await deleteFollower(myUserId, curUserId)
    console.log('controller: unfollow: ', result)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}


module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}