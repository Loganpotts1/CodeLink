const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();



router
//  @router     GET api/auth
//  @desc       Test route
//  @access     Private
.get("/",
 auth, 
 async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        return res.send(user);


    } catch (err) {
        console.log(err.message);

        return res.status(500, "The server is having some issues");
    }
})
//  @router     POST api/auth
//  @desc       Validate user
//  @access     Public
.post("/",
    [
        check("email", "A valid email is required").isEmail(),
        check("password", "A password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { email, password } = req.body;


        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).json({ errors: [{ msg: "Email or password is incorrect" }] });
            }


            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            
            if (!passwordMatch) {
                return res.status(400).json({ errors: [{ msg: "Email or password is incorrect" }] });
            }


            // Create jsonwebtoken
            const payload = {
                user: {
                    id: existingUser.id
                }
            }

            const secret = config.get("jwtSecret");

            jwt.sign(
                payload,
                secret,
                { expiresIn: 3600000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );


        } catch(err) {
            console.log(err.message);

            return res.status(500, "The server is having some issues");
        }
        
    }
);


module.exports = router;