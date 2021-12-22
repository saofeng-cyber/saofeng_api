const { verify } = require('../util/jwt.js')
const { jwtSecret } = require('../config/config.default.js')
const { findEmail } = require('../model/user.js')
module.exports = async (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({
            code: 401,
            msg: "Invalid Token"
        })
    }
    try {
        const decodeToken = await verify(token, jwtSecret)
        const results = await findEmail(decodeToken.user_email)
        req.user = results[0]
        console.log(decodeToken);
        next()
    } catch (err) {
        return res.status(401).end()
    }
}