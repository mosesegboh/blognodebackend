const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schema object
const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // confirmPassword: {
    //     type: String,
    //     required: false,
    // },
    fullName:{
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        default: Date.now,
        required: false
    },
    registeredDate: {
        type: Date,
        default: Date.now,
    },
    lastLoginDate: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    refreshToken: {
        type: String,
        required: false,
        default: ''
    }

})

module.exports = mongoose.model("user", UserSchema);