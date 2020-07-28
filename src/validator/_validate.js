/**
 * @description json schema validation
 * @author Zhenhan Li
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // output all errors (slow)
})

/**
 * 
 * @param {Object} schema json schema rules
 * @param {Object} data data waiting for validation
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate