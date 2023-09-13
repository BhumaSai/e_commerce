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
const product = require('./models/product');
// multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './products')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()} -${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/avif' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})
// .env
require('dotenv').config()


// db 
db.connect(process.env.MONGO_URI)

app.use(cors({
    origin: "https://feshopping.netlify.app",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static('products'))

// Routes
// all Products
app.use('/api', products)
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




// upload products 

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        new product({
            userid: req.body.userid,
            product: req.body.product,
            category: req.body.category,
            type: req.body.type,
            color: req.body.color,
            price: req.body.price,
            title: req.body.title,
            description: req.body.description,
            image: req.file.filename
        }).save()
        return res.status(201).json({
            msg: 'ok success'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            erroMsg: 'server error'
        })
    }
})






const Port = process.env.Port || 4000

http.listen(Port)