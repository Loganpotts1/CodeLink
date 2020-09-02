const express = require("express");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();



router
//  @router     GET api/profile/me
//  @desc       Get current users profile
//  @access     Private
.get("/me",
    auth, 
    async (req, res) => {

        try{
            const { id } = req.user;
            const profile = await Profile.findOne({ user: id }).populate("user", [ "name", "avatar" ]);

            if (!profile) {
                return res.status(400).json({ errors: [{ msg: "There is no profile for this user" }] });
            }


        } catch (err) {
            console.log(err.message);

            return res.status(500, "The server is having some issues");
        }
    }
)
//  @router     POST api/profile
//  @desc       Create or update user profile
//  @access     Private
.post("/",
    [
        auth,
        [
            check("status", "Status is required").notEmpty(),
            check("skills", "At least 1 skill is required").notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const {
            user,
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //  Build profile object
        const profileFields = {
            user: user.id,
            company,
            location,
            website: website.notEmpty() ? normalize(website, { forceHttps: true }) : '',
            bio,
            skills: Array.isArray(skills)
              ? skills
              : skills.split(',').map((skill) => ' ' + skill.trim()),
            status,
            githubusername
          };
    }
);


module.exports = router;