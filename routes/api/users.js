const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
//const auth = require("../../middleware/authMiddleware")
const authMiddleware = require("../../middleware/authMiddleware")
const isAdminMiddleware = require("../../middleware/isAdminMiddlware")
const authenticateTokenMiddleware = require("../../middleware/authenticateTokenMiddleware")


/* User model */
const User = require("../../models/User");

//access token
//const generateAccessToken = require('../helpers/generateAccessToken')

/** api/auth
 * POST
 * PUBLIC
 */
router.get("/", authMiddleware.authMiddleware, isAdminMiddleware.isAdminMiddleware, authenticateTokenMiddleware.authenticateTokenMiddleware, (req, res) => {
  const { email } = req.body;

  // Simple validation
  // if (!email || !password) {
  //   return res.status(400).json({ msg: "Please enter all fields" });
  // }

  //get all the ser
  User.find({}).then((user) => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });

    return res.json({ 
      users:user
    })
  })

  // Check for existing user
  // User.findOne({ email }).then((user) => {
  //   if (!user) return res.status(400).json({ msg: "User Does not exist" });



  //   // Validate password
  //   bcrypt.compare(password, user.password).then((isMatch) => {
  //     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  //     //const user =  { id: user.id }

  //     // const accessToken = generateAccessToken(user)
  //     // const refreshToken = generateAccessToken(user, '15s')
  //     // res.json({
  //     //         accessToken: accessToken, 
  //     //         refreshToken: refreshToken,
  //     //         user:  {
  //     //                   id: user.id,
  //     //                   name: user.name,
  //     //                   email: user.email,
  //     //                   phone: user.phone,
  //     //                   account_balance: user.account_balance,
  //     //                   account_number: user.account_number,
  //     //                 }
  //     //       })

  
  //     jwt.sign(
  //       { id: user.id },
  //       config.get("ACCESS_TOKEN_SECRET"),
  //       { expiresIn: 3600 },
  //       (err, token) => {
  //         if (err) throw err;
  //         res.json({
  //           token,
  //           user: {
  //             id: user.id,
  //             name: user.name,
  //             email: user.email,
  //           },
  //         });
  //       }
  //     );
  //   });
  // });
});

module.exports = router; 