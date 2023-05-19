const express = require('express');
const { upload, getSignedURLOfFile, deleteFile } = require('./src/utils/s3bucket');

const images = upload().single('image')

// dotenv load the .env variables into process.env
require('dotenv').config()

// multer 
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

// Instance of express app
const app = express()

// routes to post

app.post('/upload-media', function (req, res, next) {
    images(req, res, (err) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        next()
    })
},
    (req, res) => {
        const file = req?.file
        res.send({ file })
    })

app.get('/signed-url/:key', async (req, res) => {
    const result = await getSignedURLOfFile(req?.params?.key)
    res.send(result)
})

app.delete('/remove-media/:key', async (req, res) => {
    try {
        const result = await deleteFile(req?.params?.key)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT} post`))