/**
 * @description data model entry file
 * @author Zhenhan Li
 */


const User = require('./User')
const Blog = require('./blog')

Blog.belongsTo(User, {
    foreignKey: 'userId',
})



module.exports = {
    User,
    Blog
}