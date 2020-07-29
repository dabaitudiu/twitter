/**
 * @description time relate tool function
 * @author Zhenhan Li
 */

const { format } = require('date-fns')

/**
 * format time, e.g. 09.0.5 10:00
 * @param {string} str time string
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH: mm')
}
module.exports = {
    timeFormat
}