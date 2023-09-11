const UserModel = require('mongoose')
const bcrypt = require('bcrypt')

const User = new UserModel.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: Object,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    cart: {
        type: Array
    },
    wishlist: {
        type: Array
    },
    myuploads: {
        type: Array
    },
    orders: {
        type: Array
    },
    bulk: []
},
    {
        timestamps: true
    }
)

User.pre('save', async function (next) {
    if (this.isModified('password')) {
        let hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        this.confirmPassword = hash
    }
    next()
})


module.exports = UserModel.model('User', User)