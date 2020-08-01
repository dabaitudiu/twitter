/**
 * @description twitter user relations
 * @author Zhenhan Li
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: 'user id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: 'followed user id'
    }
})

module.exports = UserRelation
