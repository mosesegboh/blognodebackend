const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
// const bcrypt = require("bcryptjs")
// const config = require("config")
// const jwt = require("jsonwebtoken")
const authMiddleware = require("../../middleware/authMiddleware")
// const isAdminMiddleware = require("../../middleware/isAdminMiddlware")
const authenticateTokenMiddleware = require("../../middleware/authenticateTokenMiddleware")

/* User model */
const User = require("../../models/User");

router.post("/", authMiddleware.authMiddleware, authenticateTokenMiddleware.authenticateTokenMiddleware, (req, res) => {
  const { _id, email, birthDate, fullName, password, isAdmin  } = req.body;

  //if ( password !== '') return res.json({msg: "You cannot change your password yout password here, contact the admin to change yuour password"})

  const result = User.findOneAndUpdate(
    {_id:  mongoose.Types.ObjectId(_id) },
    {
        $set: {
            "_id": _id,
            "email": email,
            "birthDate": birthDate,
            "fullName": fullName
          },
    },
    {new: true},
    function(err, doc){
      if (err) {
        return res.send(err);
      }
    }
  )

  if ( result ) {
    return res.status(400).json({ msg: "Your message has been updated" });
  }
});

module.exports = router; 