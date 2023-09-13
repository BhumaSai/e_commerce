const myProfile = require('express').Router()
const { checkToken } = require('../middleware/signed')
const user = require('../models/userModel')

myProfile.put('/wishlist', checkToken, async (req, res) => {
    try {
        const User = await user.findById({ _id: req.user.id })
        if (!User) {
            return res.status(404).json({
                errorMsg: "user not found"
            })
        }
        const check = User.wishlist.some(data => {
            return data._id === req.body._id
        })
        if (check) {
            return res.status(302).json({
                errorMsg: 'item already added in your wishlist'
            })
        }
        await user.findByIdAndUpdate({ _id: req.user.id }, { $push: { wishlist: req.body } })

        return res.status(200).json({
            errorMsg: "product added in your  wishlist"
        })
    } catch (error) {
        return res.status(500).json({
            errorMsg: error.message
        })
    }
})
myProfile.put('/cart', checkToken, async (req, res) => {
    try {
        const User = await user.findById({ _id: req.user.id })
        if (!User) {
            return res.status(404).json({
                errorMsg: "user not found"
            })
        }
        const check = User.cart.some(data => {
            return data._id === req.body._id
        })
        if (check) {
            return res.status(302).json({
                errorMsg: 'item already added in your cart'
            })
        }
        await user.findByIdAndUpdate({ _id: req.user.id }, { $push: { cart: req.body } })

        return res.status(200).json({
            errorMsg: "product added in your cart"
        })
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'Server Error'
        })
    }
})
myProfile.get('/wishlist/items', checkToken, async (req, res) => {
    try {
        const User = await user.findById({ _id: req.user.id })

        return res.status(201).json(User.wishlist)
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server Error'
        })
    }
})
myProfile.get('/cart/items', checkToken, async (req, res) => {
    try {
        const User = await user.findById({ _id: req.user.id })

        return res.status(201).json(User.cart)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorMsg: 'server Error'
        })
    }
})
myProfile.delete('/deleteCartItems/:id', checkToken, async (req, res) => {
    try {
        const User = await user.updateOne({ _id: req.user.id }, {
            $pull: {
                cart: { _id: req.params.id }
            }
        })
        return res.status(202).json({
            errorMsg: 'item deleted'
        })
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server error'
        })
    }
})
myProfile.delete('/deleteWishlistItems/:id', checkToken, async (req, res) => {
    try {
        const User = await user.updateOne({ _id: req.user.id }, {
            $pull: {
                wishlist: { _id: req.params.id }
            }
        })

        return res.status(202).json({
            errorMsg: 'item deleted'
        })
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server error'
        })
    }
})
myProfile.get('/my-profile', checkToken, async (req, res) => {
    try {
        const User = await user.findById({ _id: req.user.id })
        return res.status(200).json(User)
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server error'
        })
    }
})
myProfile.put('/update-profile', checkToken, async (req, res) => {
    try {
        const User = await user.findByIdAndUpdate({ _id: req.user.id }, {
            $set: {
                name: req.body.name,
                mail: req.body.mail,
                mobile: req.body.mobile,
                gender: req.body.gender,
                address: {
                    State: req.body.state,
                    District: req.body.district,
                    City: req.body.city,
                    PinCode: req.body.pincode,
                    DoorNo: req.body.doorno
                }
            }
        })

        if (User) {
            return res.status(200).json({
                errorMsg: 'profile updated successfully',
                user: {
                    name: req.body.name,
                    mail: req.body.mail
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server error'
        })
    }
})
myProfile.get('/my-orders-singleProducts', checkToken, async (req, res) => {
    try {
        const User = await user.findById({ _id: req.user.id })

        return res.status(201).json(User.orders)
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server error'
        })
    }
})
myProfile.get('/my-orders-multipleProducts', checkToken, async (req, res) => {
    try {
        const User = await user.findById({ _id: req.user.id })

        return res.status(201).json(User.bulk)
    } catch (error) {
        return res.status(500).json({
            errorMsg: 'server error'
        })
    }
})

module.exports = myProfile