const express = require('express')
const mongoose = require("mongoose")
const app = express()

const server_config = require('./configs/server.config')
const db_config = require('./configs/db.config')
const User = require('./models/user.model')

const bcrypt = require('bcryptjs')

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on('error', () => {
    console.log("Error while connecting to db")
})

db.once('open', () => {
    console.log("Connected to db successfully")
    init()
})

async function init() {
    try {
        let user = await User.findOne({ userId: "admin" })

    if (user) {
        console.log("Admin user already exists")
        return}
    } catch (err) {
        console.log("Error while reading the data", err)
    }

    

    try {
        user = await User.create({
            name: "Shivani",
            userId: "admin",
            password: bcrypt.hashSync("shivani@123", 10),
            email: "shivani@gmail.com",
            userType: "ADMIN"
        })

        console.log("Admin user created successfully", user)

    } catch (err) {
        console.log("Error while creating admin user", err.message)
    }
}

app.listen(server_config.port, () => {
    console.log("Server started at port num :", server_config.port)
})