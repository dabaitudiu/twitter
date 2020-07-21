const Sequelize = require('sequelize')
const seq = require('./seq')

// create user model
const User = seq.define('user', {

    userName: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    nickName: {
        type: Sequelize.STRING
    }
})

// create blog model
const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// Foreign Key
Blog.belongsTo(User, {
    // Blog.userId -> User.id
    foreignKey: 'userId'
})
User.hasMany(Blog, {
    foreignKey: 'userId'
})

module.exports = {
    User
}