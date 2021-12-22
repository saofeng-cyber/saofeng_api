const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(morgan("dev")) //日志输出
app.use(cors()) //跨域请求
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
app.use(express.json())
// app.use(express.urlencoded())
const port = process.env.PORT || 3000
app.get('/', (req, res, next) => {
    fs.readFile('./views/index.html', 'utf-8', (err, data) => {
        if (err) {
            return res.status(404).json({
                code: 404,
                msg: "文件没找到"
            })
        }
        res.send(data)
    })
})
/**
 * 挂载路由
 */
app.use('/api', router)
/**
 * 挂载错误中间件
 */
const { MySqlConnect } = require('./model/index')
const { nextTick } = require('process')
app.get('/api', (req, res) => {
    let sql = "select * from user_info where email=?"
    let info = ["942391953@qq.com"]
    MySqlConnect(sql, info, async (error, results) => {
        console.log(results);
        res.end(JSON.stringify(results))
    })

})
app.use(errorHandler())
app.listen(port, () => {
    console.log(`Server running at:http://localhost:${port}`);
})