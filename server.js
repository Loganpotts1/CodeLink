const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");

const app = express();


//  VARIABLES
const PORT = process.env.PORT || 5000;


//  CONNECT DATABASE
connectDB();


//  CORS HEADER
app.use(cors());


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