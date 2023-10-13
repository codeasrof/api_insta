const jwt = require("jsonwebtoken")
const { promisify } = require("util")
require("dotenv").config();

const decryptedtoken = async (authHeader) => {

    const [, token] = await authHeader.split(' ')
    return promisify(jwt.verify)(token, process.env.HASH_BCRYPT);
    
}

module.exports = {decryptedtoken}