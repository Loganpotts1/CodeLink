const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

const router = express.Router();



router
//  @router     POST api/users
//  @desc       Register user
//  @access     Public
.post("/",
    [
        check("name", "Name is required").not().notEmpty(),
        check("email", "A valid email is required").isEmail(),
        check("password", "A password length of 6 or more is required").isLength({ min: 6 })
    ],
    async (req, res) => {
        const { name, email, password } = req.body;
        const errors = validationResult(req);

        !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

        try {
            const existingUser = await User.findOne({ email });

            if(existingUser) {
                res.status(400).json({ errors: [{ msg: "Email address is already in use" }] });
            }
            
            res.send("User Route");
        } catch(err) {
            console.log(err.message);
            res.status(500, "The server is having some issues");
        }
        
    }
);

module.exports = router;