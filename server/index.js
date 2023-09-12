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
const path = require('path');

// .env
require('dotenv').config()


// db 
db.connect(process.env.MONGO_URI)


app.use(cors({
    origin: 'https://fanciful-boba-d95e39.netlify.app',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));
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
    try {
        if (!req.cookies.Token) {
            return res.status(404).json({
                signed: false
            })
        }
        return res.status(201).json({
            signed: true
        })
    } catch (error) {
        res.status(500).json({
            errorMsg: 'server error'
        })
    }
})
app.get('/dfa', (req, res) => {
    res.cookie('token', 'fjlasdj').send('cookie set')
})



const Port = process.env.Port || 4000

http.listen(Port)