const S3 = require('aws-sdk/clients/s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config()

const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})


const upload = () =>
    multer({
        storage: multerS3({
            s3: s3,
            bucket: "my-media-uploader",

            metadata:function (req, file, cb) {
                cb(null, { fieldName: file.fieldname })
            },
            Key: function (req, file, cb) {
                cb(null, Date.now().toString)
            }
        })
    })


module.exports = {
    s3,
    upload
}

