/**
 * @description data model entry file
 * @author Zhenhan Li
 */


const User = require('./User')
const Blog = require('./blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
    foreignKey: 'userId',
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})


module.exports = {
    User,
    Blog,
    UserRelation
}