const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;


const PostSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    text: {
        type: Object,
        required: true
    },

    name: {
        type: String
    },

    avatar: {
        type: String
    },
    
    date: {
        type: Date,
        default: Date.now
    },

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        }
    ],

    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});


module.exports = Post = model("post", PostSchema);