const {
    createArticle,
    getArticle,
    getArticleList,
    updatedArticle,
    deletedArticle
} = require('../model/article.js')


exports.create_article = async (req, res, next) => {
    try {
        const author = req.user
        delete author.password
        const results = await createArticle(req.body.article)
        res.status(200).json({
            code: 200,
            msg: '创建成功',
            article: results,
            author,
        })
    } catch (error) {
        next(error)
    }
}

exports.getArticle = async (req, res, next) => {
    try {
        const author = req.user
        delete author.password
        const results = await getArticle(req.params.articleId)
        res.status(200).json({
            code: 200,
            msg: '获取成功',
            article: results,
            author,
        })
    } catch (error) {
        next(error)
    }
}

exports.articleList = async (req, res, next) => {
    try {
        const author = req.user
        delete author.password
        const results = await getArticleList(req.query)
        // const total_list = await getTotalArticle()
        res.status(200).json({
            code: 200,
            msg: '获取成功',
            author,
            article: results,
            // article_total: total_list.total
            article_total: results.length
        })
    } catch (error) {
        next(error)
    }
}

exports.updateArticle = async (req, res, next) => {
    try {
        const author = req.user
        delete author.password
        const results = await updatedArticle(req.params.articleId, req.body.article)
        res.status(200).json({
            code: 200,
            msg: results.changedRows == 0 ? '未作任何修改' : '修改成功',
            author,
            notify: results,
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteArticle = async (req, res, next) => {
    try {
        const author = req.user
        delete author.password
        const results = await deletedArticle(req.params.articleId)
        res.status(200).json({
            code: 200,
            msg: '删除成功',
            author,
            notify: results,
        })
    } catch (error) {
        next(error)
    }
}