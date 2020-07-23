/**
 * @description environment variables
 * @author Zhenhan Li
 */

 const ENV = process.env.NODE_ENV
 module.exports = {
     isDev: ENV === 'dev',
     notDev: ENV !== 'dev',
     isProd: END === 'production',
     notProd: ENV !== 'production'
 }