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

if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

 module.exports = {
     REDIS_CONF
 }