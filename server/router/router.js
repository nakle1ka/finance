const express = require('express')
const router = express.Router()

const auth = require("../middleware/auth.js")

const {
    newUser,
    updateUserAvatar,
    getUserStat,
    loginUser,
    saveNewElements,
    deleteAccount,
    changePassord
} = require("../controller/controller.js")

router.post("/registerNewUser", newUser)
router.post("/loginUser", loginUser)

router.post("/updateUserAvatar", auth, updateUserAvatar)
router.post("/saveElemnts", auth, saveNewElements)

router.get("/getUserStat", auth, getUserStat)

router.delete("/deleteAccount", auth, deleteAccount)
router.put("/changePassord", auth, changePassord)

module.exports = router
