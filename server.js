const express = require("express");
const connectDB = require("./config/connectDB");

const app = express();


//  VARIABLES
const PORT = process.env.PORT || 5000;


//  CONNECT DATABASE
connectDB();


//  CORS HEADER
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get("/", (req, res) => res.send("API Running"));



//  INIT BODYPARSER
app.use(express.json({ extended: false }));


//  DEFINE ROUTES
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));


//  APP LISTEN
app.listen(PORT, () => console.log(`Server is up and running on port ${ PORT }`));