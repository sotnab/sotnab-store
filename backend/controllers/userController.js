const jwt = require('jsonwebtoken')

const User = require('../models/User')

const signupAllowed = process.env.ALLOW_SIGNUP || false

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(401).json({ error: 'Missing email or password' })
    }

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({ email, token })

    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

const signup = async (req, res) => {
    const { email, password, repeatedPassword } = req.body

    if(!signupAllowed) {
        return res.status(400).json({ error: 'Actually we do not accept new users. Try again later.' })
    }

    if (!email || !password) {
        return res.status(401).json({ error: 'Missing email or password' })
    }

    if(password !== repeatedPassword) {
        return res.status(401).json({ error: 'Passwords does not match' })
    }

    try {
        const user = await User.signup(email, password)

        const token = createToken(user._id)

        res.status(200).json({ email, token })


    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

module.exports = { login, signup }