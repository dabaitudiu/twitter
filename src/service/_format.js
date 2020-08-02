/**
 * @description data formatting
 * @author Zhenhan Li
 */


const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant')
const { timeFormat } = require('../utils/dt')

/**
  * user default avatar
  * @param {Object} obj user object
  */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * format user info
 * @param {Array | Object} list user list or single user object
 */
function formatUser(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        // array user list
        return list.map(_formatUserPicture)
    }

    // single object
    let result = list
    return _formatUserPicture(list)
}


/**
 * format time
 * @param {Object} obj tweet data
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * format tweet content
 * @param {Object} obj twitter data object
 */
function _formatContent(obj) {
    obj.contentFormat = obj.content 
    
    // format: '@Ciri- ciri2020' => '<a href = "/profile/ciri">ciri</a>'
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href = "/profile/${userName}">@${nickName}</a>`
        }
    )
    
    return obj
}

/**
 * format blog info 
 * @param {Array | Object} list tweet list or single tweet
 */
function formatBlog(list) {
    if (list == null) return list

    if (list instanceof Array) {
        return list.map(_formatDBTime).map(_formatContent)
    }
    let result = list 
    result  = _formatDBTime(list)
    result = _formatContent(result)
    return result 
}


module.exports = {
    formatUser,
    formatBlog
}