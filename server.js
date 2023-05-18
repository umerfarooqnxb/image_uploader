const express = require('express');
const { upload } = require('./src/utils/s3bucket');

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
        console.log(req?.file)
        res.send({ file })
    })

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT} post`))