const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Regular expression to validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Invalid email format"
        }
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    courseEnrolled: [{
        id: String,
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
        lastModule: String,
        completed: {
            type: Array,
            default: []
        }
    }],
    courseLoved: [],
    googleId: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;