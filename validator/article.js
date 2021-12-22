const { body } = require('express-validator');
const validate = require('../middleware/validate.js')
const { findArticle } = require('../model/article.js')

exports.article_validate = validate([
    body('article.title').notEmpty().withMessage('文章题目不能为空'),
    body('article.description').notEmpty().isLength({ min: 10 }).withMessage('摘要不能为空或者长度最少为10'),
    body('article.body').notEmpty().isLength({ min: 10 }).withMessage('内容不能为空或者长度最少为10')
])

exports.isArticle_validate = async (req, res, next) => {
    const results = await findArticle(req.params.articleId)
    if (!results) {
        res.status(200).json({
            code: 200,
            msg: "文章id不存在"
        })
        return
    }
    next()
}