const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    creator: String,
    love: Number,
    isVisible: Boolean,
    category: String,
    sub_category: String,
    info: String,
    course_pic: String,
    language: String,
    lessons: [
        {
            lesson: Number,
            lessonName: String,
            link: String,
        }
    ]
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;