/**
 * @description sequelize sample
 * @author Zhenhan Li
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

const conf = {
    host: 'localhost',
    dialect: 'mysql'
}

if (isProd) {
    conf.pool = {
        max: 5,
        min: 0,
        idle: 10000
    }
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'lyp82nLF', conf)

//test 
// seq.authenticate().then(()=> {
//     console.log("ok")
// }).catch(() => {
//     console.log("error")
// })

module.exports = seq 
