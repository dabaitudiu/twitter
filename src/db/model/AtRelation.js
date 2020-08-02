/**
 * @description twitter @ user relation data model
 * @author Zhenhan Li
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: 'user Id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: 'tweet Id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false, // 默认未读
        comment: 'whether read'
    }
})

module.exports = AtRelation