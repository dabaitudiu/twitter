/**
 * @description tweet format validation
 * @author Zhenhan Li
 */

const validate = require('./_validate')

// validation rules
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}

/**
 * validate tweet format
 * @param {Object} data tweet data
 */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate