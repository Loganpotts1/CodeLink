const express = require("express");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

const router = express.Router();


//  @router     Post api/posts
//  @desc       Create a post
//  @access     Private
router.post("/",
    [
        auth,
        [
            check("text", "Text is required for a post").notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


        const { id } = req.user;
        const { text } = req.body;


        try {
            const user = await User.findById(id).select("-password");

            const newPost = new Post({
                text,
                user: id,
                name: user.name,
                avatar: user.avatar
            });

            post = await newPost.save();

            
            return res.json(post);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
);


module.exports = router;