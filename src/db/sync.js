/**
 * @description sequelize synchronize database
 * @author Zhenhan Li
 */

const seq = require('./seq')

require('./model/index')

//test connection
seq.authenticate().then(()=> {
    console.log('auth ok')
}).catch(() => {
    console.log('auth error')
})

// execute sync
seq.sync({force: true}).then(()=> {
    console.log('sync success')
    process.exit()
})