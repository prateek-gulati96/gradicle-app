require('dotenv').config()
//initials
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

//to allow app to accept json
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))

//connect db 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true } )
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//routing
const APIRouter = require('./services/services.js')
app.use('/app', APIRouter)

const port = 3000
app.listen(port, () => console.log("Server Started on port "+ port))

