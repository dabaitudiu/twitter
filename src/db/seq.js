/**
 * @description sequelize sample
 * @author Zhenhan Li
 */

const Sequelize = require('sequelize')

const conf = {
    host: 'localhost',
    dialect: 'mysql'
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'lyp82nLF', conf)

//test 
// seq.authenticate().then(()=> {
//     console.log("ok")
// }).catch(() => {
//     console.log("error")
// })

module.exports = seq 
