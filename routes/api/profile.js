const express = require("express");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const config = require("config");
const axios = require("axios");

const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const Profile = require("../../models/Profile");

const router = express.Router();



/*  ROUTES LAYOUT:
    Create/Update Profile - POST
    Add Experience - PUT
    Delete Experience - DELETE
    Add Education - PUT
    Delete Education - DELETE
    Get Current Profile - GET
    Get User Profile - GET
    Get All Profiles - GET
    Get User Github - GET
*/



//  @router     POST api/profile
//  @desc       Create or update user profile
//  @access     Private
router.post("/",
    [
        auth,
        [
            check("status", "Status is required").notEmpty(),
            check("skills", "At least 1 skill is required").notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


        const { userId } = req.user;
        const {
            avatar,
            company,
            website,
            location,
            bio,
            status,
            githubUsername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;


        try {
            //  Build profile object (It looks confusing I know, but it's actually fairly simple)
            const profileFields = {
                user: userId,
                avatar,
                company,
                location,
                website: website && website !== ""
                    ? normalize(website, { forceHttps: true })
                    : "",
                bio,
                skills: Array.isArray(skills)
                    ? skills
                    : skills.split(",").map(skill => " " + skill.trim()),
                status,
                githubUsername
            };

            //  Verifying that socialfields' inputs are actual "http://" web links
            const socialfields = { youtube, twitter, instagram, linkedin, facebook };

            for (const [key, value] of Object.entries(socialfields)) {
                if (value && value.length > 0)
                socialfields[key] = normalize(value, { forceHttps: true });
            }

            profileFields.social = socialfields;


            //  Updates profile, and creates one if one is not found
            let profile = await Profile.findOneAndUpdate(
                { user: userId },
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



//  @router     PUT api/profile/experience
//  @desc       Add experience
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


        const { userId } = req.user;
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;


        try {
            const newExperience = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            };

        
            const profile = await Profile.findOne({ user: userId });

            profile.experience.unshift(newExperience);


            await profile.save();
            

            res.json(profile);


        } catch (err) {
            console.log(err);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     DELETE api/profile/experience/:targeted_exp_id
//  @desc       Delete experience
//  @access     Private
.delete("/experience/:targeted_exp_id",
    [
        auth,
        checkObjectId("targeted_exp_id")
    ],
    async (req, res) => {
        const { userId } = req.user;
        const { targeted_exp_id } = req.params;


        try {
            const profile = await Profile.findOne({ user: userId });

            profile.experience = profile.experience.filter(
                ({ id }) => id.toString() !== targeted_exp_id
            );


            await profile.save();

            return res.json(profile);

            
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     PUT api/profile/education
//  @desc       Add education
//  @access     Private
.put("/education",
    [
        auth,
        [
            check("school", "A School is required").notEmpty(),
            check("degree", "Degree is required").notEmpty(),
            check("fieldofstudy", "A field of study is required").notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


        const { userId } = req.user;
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;


        try {
            const newEducation = {
                school,
                degree,
                fieldofstudy,
                from,
                to,
                current,
                description
            };

        
            const profile = await Profile.findOne({ user: userId });

            profile.education.unshift(newEducation);

            await profile.save();
            

            return res.json(profile);


        } catch (err) {
            console.log(err);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     DELETE api/profile/education
//  @desc       Delete education
//  @access     Private
.delete("/education/:targeted_edu_id",
    [
        auth,
        checkObjectId("targeted_edu_id")
    ],
    async (req, res) => {
        const { userId } = req.user;
        const { targeted_edu_id } = req.params;

        
        try {
            const profile = await Profile.findOne({ user: userId });

            profile.education = profile.education.filter(
                ({ id }) => id.toString() !== targeted_edu_id
            );


            await profile.save();

            return res.json(profile);

            
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     GET api/profile/me
//  @desc       Get current users profile
//  @access     Private
.get("/me",
    auth, 
    async (req, res) => {
        const { userId } = req.user;


        try{
            const profile = await Profile.findOne({ user: userId }).populate("user", [ "name", "avatar" ]);

            if (!profile) 
            return res.status(400).json({ errors: [{ msg: "There is no profile for this user" }] });


            return res.json(profile);


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
    checkObjectId("user_id"),
    async (req, res) => {
        const { user_id } = req.params;


        try {
            const profile = await Profile.findOne({ user: user_id }).populate("user", [ "name", "avatar" ]);

            if (!profile)
            return res.status(400).json({ errors: [{ msg: "Profile not found" }] });


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



// @route    GET api/profile/github/:username
// @desc     Get user's Github repos
// @access   Public
.get('/github/:username', 
    async (req, res) => {
        const { username } = req.params;


        try {
            const githubToken = config.get("githubToken");

            const uri = encodeURI(
              `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
            );
            
            const headers = {
              'user-agent': 'node.js',
              Authorization: `token ${githubToken}`
            };
        

            const githubRes = await axios.get(uri, { headers });


            return res.json(githubRes.data);
            

        } catch (err) {
            console.error(err.message);
            return res.status(404).json({ errors: [{ msg: 'No Github profile found' }] });
        }
    }
);



module.exports = router;