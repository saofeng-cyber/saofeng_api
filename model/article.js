const { MySqlConnect } = require('./index.js')
const moment = require('moment')

exports.createArticle = async (params) => {
    let user_article = {
        ...params,
        create_at: moment().format('YYYY:MM:DD HH:mm:ss'),
        updated_at: moment().format('YYYY:MM:DD HH:mm:ss'),
        favorited: true,
        favoritesCount: 0
    }
    await MySqlConnect('INSERT INTO user_article set ?',
        user_article)
    return user_article
}

exports.getArticle = async params => {
    let article = {}
    await MySqlConnect('SELECT * from user_article where id=?',
        params).then(results => {
            article = results[0]
        })
    return article
}

exports.getArticleList = async () => {
    let article_list = {}
    let sql = 'SELECT * from user_article'
    await MySqlConnect(sql).then(results => {
        article_list = results
    })
    return article_list
}

exports.getTotalArticle = async () => {
    let total_list = {}
    await MySqlConnect('SELECT COUNT(*) as total from user_article').then(results => {
        total_list = results[0]
    })
    return total_list
}

exports.updatedArticle = async (articleId, body) => {
    let total_list = {}
    await MySqlConnect('update user_article set ? where id=' + articleId, body).then(results => {
        total_list = results
    })
    return total_list
}

exports.deletedArticle = async (articleId) => {
    let total_list = {}
    await MySqlConnect('delete from user_article where id=?', articleId).then(results => {
        total_list = results
        console.log(results);
    })
    return total_list
}
exports.findArticle = async (articleId) => {
    let total_list = {}
    await MySqlConnect('SELECT * from user_article where id=?', articleId).then(results => {
        total_list = results[0]
    })
    return total_list
}