const { checkToken } = require('../middleware/signed');
const userModel = require('../models/userModel');

const Order = require('express').Router()

Order.get('/payment-method', checkToken, async (req, res) => {
    try {
        const User = await userModel.findOne({ _id: req.user.id })
        const userCartItem = User.cart.find(da => {
            return da._id === req.query.id
        })
        if (!userCartItem) {
            return res.status(400).json({
                errorMsg: 'item not found'
            })
        }
        return res.status(200).json(userCartItem)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorMsg: 'internal error'
        })
    }
})

Order.post('/ordered-item', checkToken, async (req, res) => {
    try {
        const { Product, quantity, paymentMethod, orderedDate } = await req.body
        if (!req.body) {
            return res.status(400).json({
                errorMsg: 'invalid data '
            })
        }

        const User = await userModel.findByIdAndUpdate({ _id: req.user.id }, {
            $push: {
                orders: Object.assign(Product, { quantity, paymentMethod, orderedDate })
            }
        })

        return res.status(200).json({
            errorMsg: 'item ordered successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorMsg: 'server error'
        })
    }
})

Order.post('/bulk-items', checkToken, async (req, res) => {
    try {
        const { items, itemsPrice, paymentType, orderedDate } = await req.body

        await userModel.findByIdAndUpdate({ _id: req.user.id }, {
            $push: {
                bulk: [items, { itemsPrice, paymentType, orderedDate }]
            }, $pull: {
                cart: {}
            }
        })

        return res.status(202).json({
            errorMsg: 'items ordered successfully'
        })
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server busy'
        })
    }
})

module.exports = Order