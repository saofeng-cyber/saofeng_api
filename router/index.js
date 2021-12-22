const express = require('express')
const fs = require('fs')
const router = express.Router()

/**
 * 用户相关
 */

router.use(require('./user.js'))

/**
 * 内容相关
 */

router.use('/profiles', require('./profile.js'))

/**
 * 文章相关
 */

router.use('/articles', require('./article.js'))

/**
 * 标签相关
 */

router.use('/tags', require('./tag.js'))

module.exports = router