/**
 * @description utils controller
 * @author Zhenhan Li
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// save dir
const DIST_FOLDER_PATH = path.join(__dirname, '..','..','uploadFiles')
// file max size - 1M
const MAX_SIZE = 1024 * 1024 * 1024 
// whether need to create dir
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * save file
 * @param {string} name
 * @param {string} type 
 * @param {string} size 
 * @param {string} filePath 
 */
async function saveFile({ name, type, size, filePath}) {
    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // move file
    const fileName = Date.now() + '.' + name //prevent duplication of names
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // destination
    await fse.move(filePath, distFilePath)
    
    // return info
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}