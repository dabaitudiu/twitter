/**
 * @description store configs
 * @author Zhenhan Li
 */

const {isProd} = require('../utils/env')

// a separate config file will make it easier when project is online.

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'lyp82nLF',
    port: '3306',
    database: 'koa2_weibo_db'
}


if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'lyp82nLF',
        port: '3306',
        database: 'koa2_weibo_db'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}