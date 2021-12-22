const express = require('express')
const router = express.Router()
const userControl = require('../controller/user.js')
const user_validator = require('../validator/user.js')
const authorization = require('../middleware/authorization.js')


/**
 * 用户登录
 */

router.post('/user/login', user_validator.login_validate, userControl.login)

/**
 * 用户注册
 */

router.post('/user/register', user_validator.register_validate, userControl.register)

/**
 * 获取当前用户信息
 */

router.get('/user', authorization, userControl.getUserInfo)

/**
 * 更新用户信息
 */

router.put('/user', authorization, userControl.updateUserInfo)


module.exports = router