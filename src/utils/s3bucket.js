const S3 = require('aws-sdk/clients/s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config()

//  create an instance of S3 client of aws-sdk
const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

//  Function to upload the files

const upload = () =>
    multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET_NAME,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname })
            },
            Key: (req, file, cb) => {
                cb(null, Date.now().toString)
            }
        })
    })
// get signed url 
const getSignedURLOfFile = async (key) => {
    return s3.getSignedUrl('getObject', { Bucket: process.env.AWS_BUCKET_NAME, Key: key })
}
// delete object
const deleteFile = async (key)=>{
    return s3.deleteObject({Bucket: process.env.AWS_BUCKET_NAME, Key: key})
}
module.exports = {
    upload,
    getSignedURLOfFile
}

