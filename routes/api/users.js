const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

const router = express.Router();



router
//  @router     POST api/users
//  @desc       Register user
//  @access     Public
.post("/",
    [
        check("name", "Name is required").notEmpty(),
        check("email", "A valid email is required").isEmail(),
        check("password", "A password length of 6 or more is required").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { name, email, password } = req.body;


        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ errors: [{ msg: "Email address is already in use" }] });
            }


            // Use gravatar to get avatar from email
            const avatar = gravatar.url(
                email, 
                {
                s: "200", // size
                r: "pg", // rating
                d: "mm" // default
            });

            const user = new User({
                name,
                email,
                password,
                avatar
            });


            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);


            await user.save();

            
            // Create jsonwebtoken
            const payload = {
                user: {
                    id: user.id
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