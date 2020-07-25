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

if (isTest) {
    conf.loggin = () => {}
}

if (isProd) {
    conf.pool = {
        max: 5,
        min: 0,
        idle: 10000
    }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq 
