/**
 * @description encapsulate sequelize data type
 * @author Zhenhan Li
 */

const Sequelize = require('sequelize')

module.exports = {
    STRING : Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN
}