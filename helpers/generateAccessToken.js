const jwt = require('jsonwebtoken');

const generateAccessToken = (req,res,next) => {

   return jwt.sign(user,
         config.get("ACCESS_TOKEN_SECRET"), 
         { expiresIn: 360 },)
}

module.exports = {generateAccessToken}