const express = require('express')
const fs = require('fs')
const router = express.Router()

/**
 * 获取用户资料
 */
router.get('/:username', async (req, res, next) => {
    try {
        res.status(200).json({
            msg: '获取成功'
        })
    } catch (error) {
        next(error)
    }
})
/**
 * 关注用户
 */
router.post('/:username/follow', async (req, res, next) => {
    try {
        res.status(200).json({
            msg: '获取成功'
        })
    } catch (error) {
        next(error)
    }
})

/**
 * 取消关注用户
 */
router.delete('/:username/follow', async (req, res, next) => {
    try {
        res.status(200).json({
            msg: '获取成功'
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router