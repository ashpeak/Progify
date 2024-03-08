require('dotenv').config();

const express = require("express");
const passport = require("passport");
const initializingPassport = require("./router/passportConfig");
const expressSession = require("express-session");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT;

const app = express();
require("./DB/conn");

initializingPassport(passport);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        maxAge: parseInt(process.env.COOKIE_MAX_AGE),
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Serving the Frontend
app.use(express.static(path.join(__dirname, "./client/build")));

// Linking router files
app.use(require("./router/auth"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html")),
    function (err){
        res.status(400).send(err);
    }
});

app.listen(PORT || process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server started at port ${PORT}`);
    }
});