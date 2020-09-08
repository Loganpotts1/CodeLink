const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const router = express.Router();



//  @router     POST api/users
//  @desc       Register user
//  @access     Public
router.post("/",
    [
        check("name", "Name is required").notEmpty(),
        check("email", "A valid email is required").isEmail(),
        check("password", "A password length of 6 or more is required").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


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
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
        
    }
)



//  @router     DELETE api/user
//  @desc       Delete user, profile, and posts
//  @access     Private
.delete("/",
    auth,
    async (req, res) => {
        const { id } = req.user;


        try {
            await Profile.findOneAndDelete({ user: id });

            await User.findOneAndDelete({ _id: id });


            return res.json({ msg: "User deleted" });

            
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
);



module.exports = router;