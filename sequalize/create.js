// insert sentence
const { Blog, User }  = require('./model')

!(async function () {
    // create user
    const zhangsan = await User.create({
        userName: 'zhangsan',
        password: '123',
        nickName: 'san'
    })
    console.log('zhangsan: ', zhangsan.dataValues)
})()