const express =  require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const ObjectID = require('mongodb')

//user model
const User = require('../../models/User')

//post request for registration
router.post("/", (req, res) => {
    // console.log(req.body);
    const {email, password, confirmPassword, fullName, birthDate, isAdmin} = req.body;

    //little validate
    if (!email || !password || !confirmPassword || !fullName || !birthDate) {
        return res.status(400)
                    .json({msg: "please enter your name, email, password or fullname and date of birth"})
    }

    if (password !== confirmPassword) {
        return res.status(400)
                    .json({msg: "passwords must match"})
    }
    
    // const refreshToken = "1234567"
    // id = "6277b4c7dae2f6a698181091"

 

    // if(result){
    //     console.log(result.isAdmin)
    //     console.log(true)
    // }


    //check if user already exists in the database
    User.findOne({email}).then(user => {
        // console.log(req.body);
        if (user) return res.status(400).json({msg: "User already exists"})

        const newUser = new User({
            email,
            password,
            fullName,
            birthDate,
            isAdmin
        });

       

        //create salt using bcryptjs
        bcryptjs.genSalt(10, (err, salt) => {
            // console.log('i was here 0!');
            bcryptjs.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                // console.log(hash);
                newUser.password = hash;

                newUser.save().then(user => {
                    const userparam =  { id: user.id }
                    const expiresIn = { expiresIn: '360' }

                    // const accessToken = generateToken(userparam)
                    const accessToken = jwt.sign(userparam,config.get("ACCESS_TOKEN_SECRET"),expiresIn)
                    const refreshToken = jwt.sign(userparam,config.get("ACCESS_TOKEN_SECRET"))

                    // console.log(accessToken, 'i was here')
                        //save refresh token in the database
                        const result = User.findOneAndUpdate(
                            {_id:  mongoose.Types.ObjectId(user.id) },
                            {
                                $set: {
                                    "refreshToken": refreshToken,
                                   
                                },
                            },
                            {new: true},
                            function(err, doc){
                                if (err) {
                                  return res.send(err);
                                }}
                        )
                 
                
                    res.json({
                            accessToken: accessToken, 
                            refreshToken: refreshToken,
                            user:  {
                                      id: user.id,
                                      fullName: user.fullName,
                                      email: user.email,
                                      password: user.password,
                                      birthDate: user.birthDate,
                                      registeredDate: user.registeredDate,
                                      isAdmin: user.isAdmin
                                    }
                          })
              
                    // jwt.sign(
                    //     {id: user.id},
                    //     config.get('ACCESS_TOKEN_SECRET'),
                    //     {expiresIn: 3600},
                    //     (err, token) => {
                    //         if(err) throw err;
                    //         return res.status(200).json({
                    //             accessToken: token,
                    //             user: {
                    //                 id: user.id,
                    //                 name: user.name,
                    //                 email: user.email,
                    //                 phone: user.phone,
                    //                 account_balance: user.account_balance,
                    //                 account_number: user.account_number,
                    //             },
                    //         });
                    //     }
                    // )
                })
            })
        })

    });
});

// function generateToken(user, expiresIn) {
//     if(expiresIn){
//       return jwt.sign(user,
//         config.get("ACCESS_TOKEN_SECRET"),
//         (err) => {
//           if (err) throw err;
//     })
//     }else{
//       return jwt.sign(user,
//         config.get("ACCESS_TOKEN_SECRET"), 
//         { expiresIn: '3600' },
//         (err) => {
//           if (err) throw err;
//     })
//     }
//   }
// function generateRefreshToken(user){
//     jwt.sign(userparam,config.get("ACCESS_TOKEN_SECRET"), {expiresIn: '600'})
// }

module.exports = router;
