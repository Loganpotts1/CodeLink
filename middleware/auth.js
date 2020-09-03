const jwt = require("jsonwebtoken");
const config = require("config");

const secret = config.get("jwtSecret");


module.exports = function (req, res, next) {
    //  Get token from header
    const token = req.header("x-auth-token");

    //  No token argument
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "No token, authorization is denied" }] });
    }


    //  Token verification
    try {
        const decodedToken = jwt.verify(token, secret);

        req.user = decodedToken.user;


        next();

        
    } catch (err) {
        return res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
    }
}