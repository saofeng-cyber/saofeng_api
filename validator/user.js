const { body } = require('express-validator');
const { findEmail } = require('../model/user.js')
const { md5_encryption } = require('../util/md5.js');
const validate = require('../middleware/validate.js')

exports.register_validate = validate([
    body('user.username').notEmpty().trim().withMessage('用户名不能为空'),
    body('user.password').notEmpty().isLength({ min: 5 }).withMessage('密码不能为空或者密码长度最少为5'),
    body('user.email').notEmpty().trim().isEmail().withMessage('邮箱不能为空或不是合法的邮箱').
        bail().custom(async email => {
            const results = await findEmail(email)
            if (results.length >= 1) {
                return Promise.reject("此账号已存在!")
            }
        })
])

exports.login_validate = [
    validate([
        body('user.email').notEmpty().trim().isEmail().withMessage('邮箱不能为空或不是合法的邮箱'),
        body('user.password').notEmpty().isLength({ min: 5 }).withMessage('密码不能为空或者密码长度最少为5')
    ]),
    validate([
        body('user.email').custom(async (email, { req }) => {
            const results = await findEmail(email)
            if (results.length !== 1) {
                return Promise.reject("此账号不存在!")
            }
            req.user = results[0]
        })
    ]),
    validate([
        body('user.password').custom(async (password, { req }) => {
            let now_password = md5_encryption(req.body.user.email, password)
            if (now_password !== req.user.password) {
                return Promise.reject("密码错误!")
            }
        })
    ])
]