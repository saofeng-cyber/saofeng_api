const express = require('express')
const router = express.Router()
const articleControl = require('../controller/article.js')
const article_validator = require('../validator/article.js')
const authorization = require('../middleware/authorization.js')
const { findArticle } = require('../model/article.js')

/**
 * 获取文章
 */

router.get('/:articleId', authorization, articleControl.getArticle)

/**
 * 获取文章列表
 */

router.get('/', authorization, articleControl.articleList)
/**
 * 创建文章
 */

router.post('/', authorization, article_validator.article_validate, articleControl.create_article)

/**
 * 更新文章
 */
router.put('/:articleId', authorization, article_validator.isArticle_validate, articleControl.updateArticle)

/**
 * 删除文章
 */
router.delete('/:articleId', authorization, article_validator.isArticle_validate, articleControl.deleteArticle)
module.exports = router