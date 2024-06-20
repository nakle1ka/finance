const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { getStatistic } = require("../utils/getStatistic")


const newUser = async (req, res) => { //register
    const users = await User.find({ "username": req.body.username })

    if (users.length) {
        return res.send(JSON.stringify({
            response: "This username is already taken!",
            isSuccessfully: false
        }))
    }

    const { username, password } = req.body
    const hashedPassword = (await bcrypt.hash(password, 10)).toString()

    const newUser = new User({
        username,
        password: hashedPassword
    })

    newUser
        .save()
        .then(() => {
            res
                .status(200)
                .send(JSON.stringify({
                    response: "You have successfully registered!",
                    isSuccessfully: true,
                    userId: jwt.sign(
                        { token: newUser["_id"] },
                        process.env.SECRET_KEY,
                        { expiresIn: 604800 }
                    )
                }))
        })

}

const loginUser = async (req, res) => {
    const { username, password } = req.body

    const user = (await User.find({ username: username }))[0]

    if (!user) {
        return res
            .send(JSON.stringify({
                response: "Invalid username or password",
                isSuccessfully: false
            }))
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (isValidPassword) {
        res
            .status(200)
            .send(JSON.stringify({
                response: "You have successfully logged into your account!",
                isSuccessfully: true,
                userId: jwt.sign(
                    { token: user["_id"] },
                    process.env.SECRET_KEY,
                    { expiresIn: 604800 }
                )
            }))
    } else {
        res
            .send(JSON.stringify({
                response: "Invalid username or password",
                isSuccessfully: false
            }))
    }
}

const getUserStat = (req, res) => {
    const userId = req.userId

    User
        .findById(userId)
        .then(user => {
            if (user) {
                res.send(JSON.stringify(user))
            } else {
                res
                    .clearCookie("userId")
                    .send("User not found!")
            }
        })
}

const updateUserAvatar = (req, res) => {
    const userId = req.userId
    User
        .findByIdAndUpdate(userId, { avatar: req.body.avatar }, { new: true })
        .then(resp => res.send(resp))
}

const saveNewElements = (req, res) => {
    const userId = req.userId

    const newElements = req.body

    try {
        const statObj = getStatistic(newElements)

        User
            .findByIdAndUpdate(userId, {
                $push: { output: newElements },
                $inc: statObj
            })
            .then(
                res
                    .status(200)
                    .send(JSON.stringify({
                        response: "User updated",
                        isSuccessfully: true
                    }))
            )
    } catch (err) {
        res
            .send(JSON.stringify({
                response: err,
                isSuccessfully: false
            }))
    }

}

const deleteAccount = (req, res) => {
    const userId = req.userId

    User.findByIdAndDelete(userId)
        .then(res.send("user deleted"))
}

const changePassord = async (req, res) => {
    const userId = req.userId
    const { oldPassword, newPassword } = req.body

    const userPassord = (await User.findById(userId)).password
    const isValidPassword = await bcrypt.compare(oldPassword, userPassord)
    if (isValidPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await User.findByIdAndUpdate(userId, { password: hashedPassword })
        return res.send(JSON.stringify({
            response: "User password updated",
            isSuccessfully: true
        }))
    }
    res.send(JSON.stringify({
        response: "invalid old password",
        isSuccessfully: false
    }))
}

module.exports = {
    newUser,
    updateUserAvatar,
    getUserStat,
    loginUser,
    saveNewElements,
    deleteAccount,
    changePassord
}