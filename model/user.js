const { MySqlConnect } = require('./index.js')
const moment = require('moment')
const { md5_encryption } = require('../util/md5.js')
exports.findEmail = async (value) => {
    const results = await MySqlConnect('select * from user_register where email=?',
        value)
    if (results.length > 0) {
        return results
    } else {
        return []
    }
}
exports.user_register = async userinfo => {
    let sql = "INSERT INTO user_register set?"
    let params = {
        username: userinfo.username,
        email: userinfo.email,
        password: md5_encryption(userinfo.email, userinfo.password),
        bio: userinfo.bio,
        image: userinfo.image,
        create_at: moment().format('YYYY:MM:DD HH:mm:ss'),
        updated_at: moment().format('YYYY:MM:DD HH:mm:ss')
    }
    await MySqlConnect(sql, params)
    return params
}
exports.user_login = async userinfo => {
    let sql = "select * from user_register where email=?"
    let params = [userinfo.email]
    const results = await MySqlConnect(sql, params)
    return results
}