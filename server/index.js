const express = require('express');
const db = require('mongoose')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const products = require('./Routes/products');
const auth = require('./Routes/authentification');
const cookieParser = require('cookie-parser');
const myProfile = require('./Routes/mypProfile');
const Order = require('./Routes/order');

// .env
require('dotenv').config()
// db 
db.connect(process.env.MONGO_URI)

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
// Routes
// all Products
app.use('/', products)
// authentification
app.use('/authentification', auth)
// my-profile 
app.use('/authorized', myProfile)
// order api
app.use('/orders', Order)

app.get('/signout', (req, res) => {
    try {
        if (req.cookies.Token) {
            res.clearCookie('Token')
            return res.status(201).json({
                errorMsg: 'sign out successfully'
            })
        }
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server error'
        })
    }
})
app.get('/auth', (req, res) => {

    if (req.cookies.Token) {
        return res.status(201).json({
            signed: true
        })
    } else {
        return res.status(404).json({
            signed: false
        })
    }
})


const Port = process.env.Port || 4000

http.listen(Port, () => console.log('server started'))