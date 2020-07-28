/**
 * @description user data model
 * @author Zhenhan Li
 */

const seq = require('../seq')
const {STRING, DECIMAL} = require('../types')

const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: 'username, unique'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: 'password'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: 'nickName'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: 'gender, 1: male, 2: female, 3: secret'
    },
    picture: {
        type: STRING,
        comment: 'avatar url'
    },
    city: {
        type:STRING,
        comment: 'city'
    }
})

module.exports = User