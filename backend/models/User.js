const bcrypt = require('bcrypt')
const { isEmail, isStrongPassword } = require('validator').default
const { Schema, model } = require('mongoose')

const passwordOptions = {
    minLength: 6,
    minSymbols: 0
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.statics.signup = async function(email, password) {
    if(!email || !password) {
        throw Error('Missing email or password')
    }

    if(!isEmail(email)) {
        throw Error('Invalid email')
    }

    if(!isStrongPassword(password, passwordOptions)) {
        throw Error('Password not strong enough')
    }

    const user = await this.findOne({ email })

    if(user) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    const newUser = await this.create({ email, password: hash })

    return newUser
}

UserSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('Missing email or password')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('User with provided email does not exist')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user
}

const User = model('User', UserSchema)

module.exports = User