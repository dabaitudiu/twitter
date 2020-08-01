/**
 * @description methods to connect redis
 * @author Zhenhan Li
 */

const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

// create client
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err=> {
    console.error('redis error', err)
})

/**
  * redis set
  * @param {string} key key for the map
  * @param {string} val value for specific key
  * @param {number} timeout timeou/lapse. unit: second
  */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
  * redis get
  * @param {string} key key
  */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}