const express = require("express");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();



//  @router     GET api/profile/me
//  @desc       Get current users profile
//  @access     Private
router.get("/me",
    auth, 
    async (req, res) => {

        try{
            const { id } = req.user;
            const profile = await Profile.findOne({ user: id }).populate("user", [ "name", "avatar" ]);

            if (!profile) 
            return res.status(400).json({ errors: [{ msg: "There is no profile for this user" }] });


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
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

        if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


        const { id } = req.user;

        const {
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

        //  Build profile object (It looks confusing i know, but it's actually fairly simple)
        const profileFields = {
            user: id,
            company,
            location,
            website: website && website !== ""
                ? normalize(website, { forceHttps: true })
                : "",
            bio,
            skills: Array.isArray(skills)
                ? skills
                : skills.split(",").map((skill) => " " + skill.trim()),
            status,
            githubusername
        };

        //  Verifying that socialfields' inputs are actual "http://" web links
        const socialfields = { youtube, twitter, instagram, linkedin, facebook };

        for (const [key, value] of Object.entries(socialfields)) {
            if (value && value.length > 0)
            socialfields[key] = normalize(value, { forceHttps: true });
        }

        profileFields.social = socialfields;


        //  Updates profile, and creates on if one is not found
        try {
            let profile = await Profile.findOneAndUpdate(
                { user: id },
                { ...profileFields },
                { new: true, upsert: true }
            );

            return res.send(profile);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     GET api/profile
//  @desc       Get all profiles
//  @access     Public
.get("/",
    async (req, res) => {
        try {
            const profiles = await Profile.find().populate("user", [ "name", "avatar" ]);

            return res.send(profiles);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     GET api/profile/users/:user_id
//  @desc       Get profile by user id
//  @access     Public
.get("/users/:user_id",
    async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", [ "name", "avatar" ]);

            if (!profile)
            return res.status(400).json({ errors: [{ msg: "Profile not found" }] });

            return res.send(profile);

            
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     DELETE api/profile
//  @desc       Delete user, profile, and posts
//  @access     Private
.delete("/",
    auth,
    async (req, res) => {
        try {
            const { id } = req.user;

            await Profile.findOneAndDelete({ user: id });

            await User.findOneAndDelete({ _id: id });

            return res.json({ msg: "User deleted" });

            
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     PUT api/profile/experience
//  @desc       Update profile to include experience
//  @access     Private
.put("/experience",
    [
        auth,
        [
            check("title", "A Title is required").notEmpty(),
            check("company", "A company name is required").notEmpty(),
            check("from", "A 'from' date is required").notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


        const { id } = req.user;

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExperience = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };


        try {
            const profile = await Profile.findOne({ user: id });

            profile.experience.unshift(newExperience);

            await profile.save();
            

            res.json(profile);

            
        } catch (err) {
            console.log(err);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
);



module.exports = router;