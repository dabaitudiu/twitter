/**
 * @description data formatting
 * @author Zhenhan Li
 */


const { DEFAULT_PICTURE } = require('../conf/constant')

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

module.exports = {
    formatUser
}