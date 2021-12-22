const mysql = require('mysql')
const { mysql_config } = require('../config/config.default.js')
const Pool = mysql.createPool(mysql_config);
const connection = (sql, params, callback) => Pool.getConnection((error, connect) => {
    if (error) {
        console.log("MySQL Failed");
        connect.release()
    } else {
        console.log("MySQL Succeed");
        connect.query(sql, params, (err, results, fields) => {
            callback(err, results, fields)
        })
        connect.release()
    }
})
module.exports = {
    MySqlConnect: (sql, params) => {
        return new Promise((resolve, reject) => {
            connection(sql, params, (err, results) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(results)
            })
        })
    }
}