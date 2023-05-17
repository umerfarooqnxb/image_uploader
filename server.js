const express = require('express');

// dotenv load the .env variables into process.env
require('dotenv').config()

// Instance of express app
const app = express()



app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT} post`))