/* User model */
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isAdminMiddleware = (req, res, next) => {
    // const token = req.cookies.jwt
    const {email, isAdmin} = req.body

    //find user in the myFirstDatabase
    User.findOne({email}).then(user => {
        if (isAdmin !== true) {
            return res.json({msg: 'Only Admins can view this page'})
        }
        next()
    })

    //check if json web token exists and is verified
    // if (token) {
    //     jwt.verify(token, config.get('ACCESS_TOKEN_SECRET'), (err, decodedToken) => {
    //         if(err){
    //             console.log(err.message);
    //             return res.json({msg: 'You need to login to access this page'})
    //         }else{
    //             console.log(decodedToken)
    //             next();
    //         }
    //     })
    // }else {
    //     return res.json({msg: 'You need to login to access this page'})
    // }
}

module.exports = {isAdminMiddleware}