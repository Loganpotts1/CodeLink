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



/*  ROUTES LAYOUT:
    Create User - POST
    Delete User, Profile, and Posts - DELETE
*/



//  @router     POST api/users
//  @desc       Create user
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

            if (existingUser)
            return res.status(400).json({ errors: [{ msg: "Email address is already in use" }] });


            const user = new User({
                name,
                email,
                password
            });


            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);


            await user.save();

            
            // Create jsonwebtoken
            const payload = {
                user: {
                    userId: user.id
                }
            };

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



//  @router     DELETE api/users
//  @desc       Delete user, profile, and posts
//  @access     Private
.delete("/",
    auth,
    async (req, res) => {
        const { userId } = req.user;


        try {
            await Profile.findOneAndDelete({ user: userId });
            await User.findOneAndDelete({ _id: userId });

            return res.json({ msg: "User deleted" });

            
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
);



module.exports = router;