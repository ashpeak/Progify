const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    creator: String,
    rating: Number,
    isVisible: Boolean,
    category: String,
    info: String,
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