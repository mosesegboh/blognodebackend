const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')

//routes
// const userRouter = require("./routes/api/register")
const userRouter = require("./routes/api/user")
const editRouter = require("./routes/api/edit")


//initialize app
const app = express()

//body parser middleware
app.use(express.json())

//load environment variables
dotenv.config({path: "./config.env"})

//dev login using morgan
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

require('./config/db')

app.get("/", (req, res) => res.status(200).send({message: "the regular server has been hit"}))
// app.use("/api/users", userRouter);
// app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)
app.use("/api/edit", editRouter)

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(port, () => `Server started on port ${port}`);
    module.exports = server;
}

module.exports = {app};