/**
 * @description fail info collection
 * @author Zhenhan Li
 */

module.exports = {
    // username exist
    registerUserNameExistInfo: {
        errno: 10001,
        message: 'username exist'
    },
    // register fail
    registerFailInfo: {
        errno: 10002,
        message: 'register fail, plase retry'
    },
    // username not exist
    registerUserNameNotExistInfo: {
        errno: 10003,
        message: 'username not exist'
    },
    // login fail
    loginFailInfo: {
        errno: 10004,
        message: 'sign in failure, incorrect username or password'
    },
    // not loggin
    loginCheckFailInfo: {
        errno: 10005,
        message: 'you have not signed in '
    },
    // modify pwd fail
    changePasswordFailInfo: {
        errno: 10006,
        message: 'change password failure, please retry'
    },
    // upload size too big
    uploadFileSizeFailInfo: {
        errno: 10007,
        message: 'upload file size too large'
    },
    // modify info fail
    changeInfoFailInfo: {
        errno: 10008,
        message: 'modify fail'
    },
    // json schema check fail
    jsonSchemaFileInfo: {
        errno: 10009,
        message: 'data type or format fail'
    },
    // delete account fail
    deleteUserFailInfo: {
        errno: 10010,
        message: 'delete user fail'
    },
    // follow fail
    addFollowerFailInfo: {
        errno: 10011,
        message: 'follow fail'
    },
    // unfollow fail
    deleteFollowerFailInfo: {
        errno: 10012,
        message: 'unfollow fail'
    },
    // create twitter fail
    createBlogFailInfo: {
        errno: 11001,
        message: 'create twitter account fail'
    },
    // delete twitter fail
    deleteBlogFailInfo: {
        errno: 11002,
        message: 'delete twitter account fail'
    }
}