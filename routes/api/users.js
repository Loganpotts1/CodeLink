const express = require("express");
const { check, validationResult } = require("express-validator");
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
    (req, res) => {
        const errors = validationResult(req);

        !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

        console.log(req.body);
        res.send("User Route");
    }
);

module.exports = router;