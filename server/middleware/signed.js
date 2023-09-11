const jwt = require('jsonwebtoken')


const checkToken = async (req, res, next) => {
    try {
        const Token = await req.cookies.Token;
        if (!Token) {
            return res.status(404).json({
                errorMsg: 'Token not found please log in'
            })
        }
        let User = jwt.verify(Token, process.env.JWT_PASSWORD)
        req.user = User
        next()

    } catch (error) {
        return res.status(500).json({ errorMsg: error.message })
    }
}

module.exports = { checkToken } 