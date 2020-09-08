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
)



//  @router     GET api/posts/:post_id
//  @desc       Get post by ID
//  @access     Public
.get("/:post_id",
    async (req, res) => {
        const { post_id } = req.params;


        try {
            const post = await Post.findById(post_id);

            if (!post)
            return res.status(404).json({ errors: [{ msg: "Post not found" }] });


            return res.json(post);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     GET api/posts
//  @desc       Get all posts
//  @access     Public
.get("/",
    async (req, res) => {

        try {
            const posts = await Post.find().sort({ date: -1 }); //  This sorts the posts by the most recent


            return res.json(posts);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     PUT api/posts/like/:post_id
//  @desc       Like post
//  @access     Private
.put("/like/:post_id",
    auth,
    async (req, res) => {
        const { id } = req.user;
        const { post_id } = req.params;


        try {
            const post = await Post.findById(post_id);

            if (post.likes.some(({ user }) => user.toString() === id)) // Checks to see if user has already liked this post
            return res.status(400).json({ errors: [{ msg: "You have already liked this post" }] });


            post.likes.unshift({ user: id });

            await post.save();


            return res.json(post.likes);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     PUT api/posts/unlike/:post_id
//  @desc       Unlike post
//  @access     Private
.put("/unlike/:post_id",
    auth,
    async (req, res) => {
        const { id } = req.user;
        const { post_id } = req.params;


        try {
            const post = await Post.findById(post_id);

            if (!post.likes.some(({ user }) => user.toString() === id)) // Checks to see if user has already liked this post
            return res.status(400).json({ errors: [{ msg: "You have not liked this post" }] });


            post.likes = post.likes.filter(({ user }) => user.toString() !== id);

            await post.save();


            return res.json(post.likes);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     DELETE api/posts/:post_id
//  @desc       Delete post
//  @access     Private
.delete("/:post_id",
    auth,
    async (req, res) => {
        const { id } = req.user;
        const { post_id } = req.params;


        try {
            const post = await Post.findById(post_id);

            if (post.user.toString() !== id) // post.user is type: ObjectId, so it must be converted to string to match user.id
            return res.status(401).json({ errors: [{ msg: "You cannot delete others' posts" }] });


            await post.remove();


            return res.json({ msg: "Post deleted" });


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
);



module.exports = router;