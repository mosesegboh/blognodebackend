const express = require('express')
// const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')

//routes
const registerRouter = require("./routes/api/register")
const loginRouter = require("./routes/api/login")
const usersRouter = require("./routes/api/users")

//initialize app
const appAuth = express()

//body parser middleware
appAuth.use(express.json())

//load environment variables
dotenv.config({path: "./config.env"})

//dev login using morgan
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

require('./config/db')

appAuth.get("/", (req, res) => res.send("the authserver has been hit"))

//API's
// app.get("/", (req, res) => res.send("the homepage has been hit"))
appAuth.use("/api/register", registerRouter)
appAuth.use("/api/login", loginRouter)
appAuth.use("/api/users", usersRouter)

const port = process.env.PORT || 4000;
const port2 = 7000
if (process.env.NODE_ENV !== 'test') {
    const authServer  = appAuth.listen(port, () => `Server started on port ${port2}`)
    module.exports = authServer;
}

module.exports = {appAuth};

