const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    courseEnrolled: [{
        id: String,
        courseId: String,
        lastModule: String
    }],
    courseLoved: [],
    email: String,
    googleId: String,
    secret: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;