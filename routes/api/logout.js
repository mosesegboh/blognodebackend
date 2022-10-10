const express =  require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//user model
const User = require('../../models/User');

//post request for registration
router.post("/logout", (req, res) => {
    //delete the refresh token

    res.sendStatus(204)
});

module.exports = router;
