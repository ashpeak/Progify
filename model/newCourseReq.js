const mongoose = require("mongoose");

const newCourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    playlist: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const newCourse = mongoose.model("newCourse", newCourseSchema);

module.exports = newCourse;