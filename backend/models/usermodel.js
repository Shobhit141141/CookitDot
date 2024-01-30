const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema

const usersmodel = new Schema({

    username: {
        type: String,
        rquired: true,
        unique: true
    },
    email: {
        type: String,
        rquired: true,
        unique: true
    },
    password: {
        type: String,
        rquired: true
    },



}, { timestamps: true })
//static method that can be designed in mongoose other than SEAD
usersmodel.statics.signup = async function (username, email, password) {

    if (!email || !password) {
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email Not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong')
    }

    const mailexists = await this.findOne({ email })
    if (mailexists) {
        throw Error('Email is in use ')
    }

    const userexists = await this.findOne({ username })
    if (userexists) {
        throw Error('Username taken')
    }


    const salt = await bcrypt.genSalt(10)

    const hashed = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hashed })

    return user
}

usersmodel.statics.login = async function (username, password) {

    if (!username || !password) {
        throw Error('All fields are required')
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user


}

module.exports = mongoose.model('users', usersmodel)
