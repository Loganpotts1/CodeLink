const mongoose = require("mongoose");
const config = require("config");

const database = config.get("MongoURI");


const connectDB = async () => {
    try {
        await mongoose.connect(database, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex: true
            });

        console.log("MongoDB Connected");


    } catch(err) {
        console.log(err.message);

        process.exit(1); // This exits out of the function
    }
};


module.exports = connectDB;