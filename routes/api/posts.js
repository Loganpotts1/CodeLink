const express = require("express");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const router = express.Router();



/*  ROUTES LAYOUT:
    Create Post - POST
    Delete Post - DELETE
    Like/Unlike Post - PUT
    Comment on Post - POST
    Delete Comment - DELETE
    Get Post by ID - GET
    Get All Posts - GET
*/



//  @router     POST api/posts
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


        const { userId } = req.user;
        const { text } = req.body;


        try {
            const user = await User.findById(userId).select("-password");
            const profile = await Profile.findOne({ user: userId });

            const newPost = new Post({
                text,
                user: userId,
                name: user.name,
                avatar: profile.avatar || ""
            });

            post = await newPost.save();


            return res.json(post);


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
    [
        auth,
        checkObjectId("post_id")
    ],
    async (req, res) => {
        const { userId } = req.user;
        const { post_id } = req.params;


        try {
            const post = await Post.findById(post_id);

            if (post.user.toString() !== userId) // post.user is type: ObjectId, so it must be converted to string to match user.id
            return res.status(401).json({ errors: [{ msg: "You cannot delete others' posts" }] });


            await post.remove();


            return res.json({ msg: "Post Deleted" });


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     PUT api/posts/like/:post_id
//  @desc       Like/Unlike post
//  @access     Private
.put("/like/:post_id",
    [
        auth,
        checkObjectId("post_id")
    ],
    async (req, res) => {
        const { userId } = req.user;
        const { post_id } = req.params;


        try {
            const post = await Post.findById(post_id);


            const alreadyLiked = post.likes.some(
                ({ user }) => user.toString() === userId
            );

            if (alreadyLiked) {

                post.likes = post.likes.filter(
                    ({ user }) => user.toString() !== userId
                );

            } else {

                post.likes.unshift({ user: userId });

            }


            await post.save();


            return res.json(post.likes);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)



//  @router     POST api/posts/comment/:post_id
//  @desc       Create a post comment
//  @access     Private
.post("/comment/:post_id",
    [
        auth,
        checkObjectId("post_id"),
        [
            check("text", "Text is required for a post").notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });


        const { post_id } = req.params;
        const { userId } = req.user;
        const { text } = req.body;


        try {
            const user = await User.findById(userId).select("-password");
            const profile = await Profile.findOne({ user: userId });
            const post = await Post.findById(post_id);

            const newComment = {
                text,
                user: userId,
                name: user.name,
                avatar: profile.avatar || ""
            };

            post.comments.unshift(newComment);

            await post.save();


            return res.json(post.comments);


        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ errors: [{ msg: "The server is having some issues" }] });
        }
    }
)


//  @router     DELETE api/posts/comment/:post_id/:comment_id
//  @desc       Delete a post comment
//  @access     Private
.delete("/comment/:post_id/:comment_id",
    [
        auth,
        checkObjectId("post_id"),
        checkObjectId("comment_id")
    ],
    async (req, res) => {
        const { userId } = req.user;
        const { post_id, comment_id } = req.params;


        try {
            const post = await Post.findById(post_id);


            const comment = post.comments.find(
                ({ id }) => id.toString() === comment_id
            );

            if (!comment)
            return res.status(404).json({ errors: [{ msg: "Comment does not exist" }] });

            if (comment.user.toString() !== userId)
            return res.status(404).json({ errors: [{ msg: "You cannot delete someone else's comment" }] });

            
            post.comments = post.comments.filter(
                ({ id }) => id.toString() !== comment_id
            );


            await post.save();


            return res.json(post.comments);

            
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
    checkObjectId("post_id"),
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
);



module.exports = router;