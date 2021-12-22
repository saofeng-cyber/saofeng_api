const { user_register, user_login } = require('../model/user.js')
const { jwtSecret } = require('../config/config.default.js')
const { sign } = require('../util/jwt.js')

/**
 * 用户登录
 */
exports.login = async (req, res, next) => {
    try {
        const user = req.user
        const token = await sign(
            {
                user_email: user.email
            },
            jwtSecret,
            {
                expiresIn: "1 days"
            }
        )
        await user_login(req.body.user).then(results => {
            res.status(200).json({
                code: 200,
                msg: '登录成功',
                account: results,
                token,
            })
        }).catch(err => {
            res.status(200).json({
                code: 200,
                msg: '登录失败',
                account: req.body.user,
                error_msg: err
            })
        })
    } catch (error) {
        next(error)
    }
}
/**
 * 用户注册
 */
exports.register = async (req, res, next) => {
    try {
        await user_register(req.body.user).then(results => {
            res.status(200).json({
                code: 200,
                msg: '恭喜你，注册成功',
                account: results
            })
        }).catch(err => {
            res.status(200).json({
                code: 200,
                msg: '注册失败',
                account: req.body.user,
                error_msg: err
            })
        })

    } catch (error) {
        next(error)
    }
}
/**
 * 获取当前用户信息
 */

exports.getUserInfo = async (req, res, next) => {
    try {
        // const token = req.headers.authorization
        res.status(200).json({
            code: 200,
            msg: '获取成功',
            user_info: req.user,
        })
    } catch (error) {
        next(error)
    }
}

/**
 * 更新用户信息
 */

exports.updateUserInfo = async (req, res, next) => {
    try {
        res.status(200).json({
            msg: '更新成功'
        })
    } catch (error) {
        next(error)
    }
}