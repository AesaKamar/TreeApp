const fs = require('fs')
const Promise = require('bluebird');
const path = require('path')

/**
 * test Helpers
 * @module ginko/test_helpers
 */
module.exports = {

    getRandomEmojiAsBase64: getRandomEmojiAsBase64
}


/**
 * @function getRandomEmojiAsBase64
 * @description get a random emoji as a base 64 encoded string. In a promise, so use .then to access it. 
 * @param {string} folderLocation {Where to find the emojis} 
 * @return {Promise<string>} {constains Base 64 image string of emoji}
 */
function getRandomEmojiAsBase64(folderLocation) {
    //Set up the promise to be returned
    return new Promise((resolve, reject) => {
        //Read the directory of emojis
        fs.readdir(folderLocation, (err, files) => {
            //Read a randomly Selected file
            if (err) reject(err)
            let randomlySelectedFileName = files[Math.floor(Math.random() * files.length)];
            let imagePath = path.join(folderLocation, randomlySelectedFileName)
            fs.readFile(imagePath, (err1, data) => {
                //Resolve the file contents as a base 64 image
                if (err1) reject(err)
                let base64DataBuffer = data.toString('base64')
                resolve(base64DataBuffer)
            })
        })
    })
}