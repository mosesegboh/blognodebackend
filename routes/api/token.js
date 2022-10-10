const express =  require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//user model
const User = require('../../models/User');

//post request for registration
router.post("/token", (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    //check if refresh token already exists in the database
    jwt.verify(refeshToken, config.get('ACCESS_TOKEN_SECRET'), (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({id: user.id})
        res.json({accessToken: accessToken})
    })
});

module.exports = router;
