const {decryptedtoken} = require("../utils/token")
const {decrypt} = require("../utils/crypt")

const verityJwt = async (req,res,next) => {
    const authHeader = await req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "Unset Token!"})
    }

    try {
        const { newId: userId } = await decryptedtoken(authHeader);
        req.userId = parseInt(decrypt(userId))
        console.log(userId)
        return next()
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: "Unauthorized!"})
    }
}
module.exports = verityJwt