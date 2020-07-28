/**
 * @description utils api route
 * @author Zhenhan Li
 */

const router = require('koa-router')()
const{ loginCheck } = require('../../middlewares/loginChecks')
const koaFrom = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')



router.prefix('/api/utils')

// upload images
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
    const file = ctx.req.files['file']
    const { size, path, name, type } = file
    // controller 
    ctx.body = await saveFile({
        name, type, size, filePath: path
    })

})

module.exports = router