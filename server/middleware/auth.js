const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(" ")[1]

    if(!token) {
        return res.send("Unautherizated!")
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        if(err) return res.send("Invalid Token!")

        req.userId = result.token

        next()
    })
}
 
module.exports = auth