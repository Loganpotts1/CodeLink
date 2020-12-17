const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;


const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String, 
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },
    
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = User = model("user", UserSchema);