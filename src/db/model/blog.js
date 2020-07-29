/**
 * @description tweets data model
 * @author Zhenhan Li
 */

seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNul: false,
        comment: 'user id'
    },
    content : {
        type: TEXT,
        allowNul: false,
        comment: 'tweet content'
    },
    image: {
        type: STRING,
        comment: 'picture url'
    }
})

module.exports = Blog