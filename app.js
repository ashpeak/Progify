require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');

const app = express();
require("./DB/conn");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL, // Replace with your client's origin
    credentials: true,
}));

// Serving the Frontend
app.use(express.static(path.join(__dirname, "./client/dist")));

// Linking router files
app.use(require("./router/auth"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html")),
        function (err) {
            res.status(400).send(err);
        }
});

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server started at port ${process.env.PORT || 3000}`);
    }
});