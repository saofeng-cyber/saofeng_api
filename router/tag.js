const express = require('express')
const fs = require('fs')
const router = express.Router()

/**
 * 文章相关
 */
router.get('/', async (req, res, next) => {
    try {
        /**
         * 处理请求
         */
        res.status(200).json({
            msg: '获取成功'
        })
    } catch (error) {
        next(error)
    }
})

/**
 * 获取用户关注的作者文章列表
 */

router.get('/feed', async (req, res, next) => {
    try {
        /**
         * 处理请求
         */
        res.status(200).json({
            msg: '获取成功'
        })
    } catch (error) {
        next(error)
    }
})

/**
 * 获取文章
 */

router.get('/:slug', async (req, res, next) => {
    try {
        /**
         * 处理请求
         */
        res.status(200).json({
            msg: '获取成功'
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router