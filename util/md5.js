const crypto = require('crypto')
// console.log(crypto.getHashes());
exports.md5_encryption = (secret_key, content) => crypto.createHash('md5').update(secret_key + content).digest('base64')