/**
 * @description jest server test
 * @author Zhenhan Li
 */

 const request = require('supertest')
 const server = require('../src/app').callback()

 module.exports = request(server)