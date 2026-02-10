// require("dotenv").config({ path: "../config.env" });
require("dotenv").config();
const express = require("express");
const router = express.Router();
require("../DB/conn");
const crypto = require("crypto");
const Course = require("../model/courseSchema");
const Note = require("../model/userNoteSchema");
const User = require("../model/userSchema");
const Token = require("../model/tokenSchema");
const sendEmail = require("../utils/sendEmail");
const newCourse = require("../model/newCourseReq");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../model/refreshToken");
const mongoose = require("mongoose");
const axios = require("axios");

const isAuthorized = (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    const user = accessToken ? jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET) : null;

    if (user) {
        req.user = user;
        return next();
    }
    return res.status(401).json({ msg: "Unauthorized" });
}

router.get("/api/logout", (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({ msg: "Logged out!" });
})

router.get("/api/users/dashboard", isAuthorized, async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.user.id }).populate("courseEnrolled.courseId", "_id name creator course_pic");

        const { courseEnrolled, courseLoved } = user;

        return res.status(200).json({ courseEnrolled, courseLoved });
    } catch (error) {
        return res.status(400).json({ msg: "Not Found, don't exists or might removed" });
    }
})

router.post("/api/user/course/loved", isAuthorized, async (req, res) => {
    const id = req.body.id;
    const user_id = req.user.id;

    try {
        const result = await User.findOneAndUpdate(
            { _id: user_id },
            { $addToSet: { courseLoved: id } },
            { new: true }
        );

        if (result) {
            const newData = await Course.findOneAndUpdate(
                { _id: id },
                { $inc: { love: 1 } },
                { new: true }
            );
            return res.status(200).json({ love: newData.love });
        }

        return res.status(400).json({ msg: "Failed!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Failed!" });
    }
})

router.post("/api/user/course/unloved", isAuthorized, async (req, res) => {
    const id = req.body.id;
    const user_id = req.user.id;

    try {
        const result = await User.findOneAndUpdate(
            { _id: user_id },
            { $pull: { courseLoved: id } },
            { new: true }
        );

        if (result) {
            const newData = await Course.findOneAndUpdate(
                { _id: id },
                { $inc: { love: -1 } },
                { new: true }
            );
            return res.status(200).json({ love: newData.love });
        }

        return res.status(400).json({ msg: "Failed!" });
    } catch (error) {
        return res.status(400).json({ msg: "Failed!" });
    }
})

router.get("/api/token/refresh", async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    const user = refreshToken ? jwt.verify(refreshToken, process.env.JWT_ACCESS_SECRET) : null;

    if (user) {
        const userData = await RefreshToken.findOne({ userId: user.id, token: refreshToken }).populate("userId");

        if (userData && userData.userId) {
            const accessToken = jwt.sign({ id: userData.userId._id, name: userData.userId.name, role: userData.userId.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "5m" });
            const options = {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                expires: new Date(Date.now() + 5 * 60 * 1000),
            }

            res.cookie("accessToken", accessToken, { ...options });

            return res.status(200).json({ loggedIn: true, name: userData.userId.name, role: userData.userId.role });
        } else {
            // Clean up orphaned refresh token if user doesn't exist
            if (userData) await RefreshToken.deleteOne({ _id: userData._id });
            return res.status(401).json({ msg: "Unauthorized" });
        }
    } else return res.status(401).json({ msg: "Unauthorized" });
});

router.post("/api/enroll", isAuthorized, async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.body;
    const lastModule = "Yet to start";

    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { courseEnrolled: { courseId, lastModule } } }
        );

        if (user) {
            return res.status(200).json({ msg: "Course enrolled" });
        } else {
            return res.status(400).json({ msg: "Something went wrong!" });
        }
    } catch (error) {
        res.status(404).json({ msg: "User not found! Try again." });
    }
})

router.post("/api/register", async (req, res) => {
    const { name, password, email } = req.body;

    let user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ msg: "User already exists!" });
    }

    if (name.length > 20 || name.length < 5 || password.length < 8 || password.length > 30) {
        return res.status(400).json({ msg: "Invalid Input!" });
    }
    try {
        user = await User.create({
            name,
            email,
            password
        });

        const token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        });

        token.save();

        const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Confirm account", url, "VERIFY");

        res.status(201).json({ msg: "An Email sent to your account please verify" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error occured!" });
    }
});

router.get("/api/users/:id/verify/:token", async (req, res) => {
    try {
        const token = await Token.findOne({
            userId: req.params.id,
            token: req.params.token
        });

        if (!token) return res.status(400).json({ msg: "Invalid link!" });

        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { verified: true } }
        );

        if (!user) return res.status(400).json({ msg: "Invalid link!" });

       return res.status(200).json({ msg: "Account verified!" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error!" });
    }
});

router.get("/api/users/:email/reset", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) return res.status(400).json({ msg: "Account not found!" });

        let token = await Token.findOne({ userId: user.id });

        if (!token) {
            token = new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            });

            token.save();
        }

        const url = `${process.env.BASE_URL}/users/${user.id}/reset/${token.token}`;
        await sendEmail(user.email, "Password Reset", url, "RESET");

        return res.status(200).json({ msg: "Password reset link sent" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error!" });
    }
});

router.get("/api/users/:id/reset/:token/pass/:pass", async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.params.id });

        if (!user) return res.status(400).json({ msg: "Link invalid or expired!" });

        const token = await Token.findOne({
            userId: user.id,
            token: req.params.token
        });

        if (!token) return res.status(400).json({ msg: "Link invalid or expired!" });

        if (req.params.pass === "0") return res.status(200).json({ msg: "Valid link!" });

        if (req.params.pass.length < 8 || req.params.pass.length > 30) return res.status(400).json({ msg: "Invalid inputs!" });

        await User.updateOne(
            { _id: user.id },
            { $set: { password: req.params.pass } }
        );

        await token.remove();

        return res.status(200).json({ msg: "Password changed successfully!" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error!" });
    }
});

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Invalid inputs!" });
    }
    const user = await User.findOne({ email: email });

    // check user available or not and also compare bcrypt password
    if (!user || password !== user.password) {
        return res.status(400).json({ msg: "Invalid credentials!" });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_ACCESS_SECRET, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "90d" });

    const options = {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 5 * 60 * 1000),
    }

    await RefreshToken.create({
        userId: user._id,
        token: refreshToken
    });

    res.cookie("accessToken", accessToken, { ...options });
    res.cookie("refreshToken", refreshToken, { ...options, expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) });

    return res.status(200).json({ loggedIn: true, name: user.name, role: user.role });

});

router.post("/api/note", isAuthorized, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, courseId } = req.body;
    const customId = courseId + lessonId + userId;

    try {
        const notes = await Note.find({ customId: customId });

        if (!notes) return res.status(404).json({ msg: "Notes empty!" });
        return res.status(200).json(notes);
    } catch (error) {
        console.log(error);
    }
});

router.post("/api/note/new", isAuthorized, async (req, res) => {
    let { courseId, lessonId, title, content } = req.body;
    const userId = req.user.id;
    const customId = courseId + lessonId + userId;

    title = title.trim();
    content = content.trim();

    if (!lessonId || !userId || !title || !content || !courseId) {
        return res.status(422).json({ error: "Empty input fields!" });
    }

    title = title.substring(0, 15);
    content = content.substring(0, 500);

    try {
        const note = new Note({
            customId: customId,
            title: title,
            content: content
        });
        await note.save();

        res.status(201).json({ msg: "note saved!" });

    } catch (err) {
        res.status(500).json("An error occured")
        console.log(err);
    }
});

router.post("/api/note/edit", isAuthorized, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, courseId, noteId, content } = req.body;
    const customid = courseId + lessonId + userId;

    try {
        const result = await Note.findOneAndUpdate({
            _id: noteId,
            customId: customid
        }, {
            $set: { content: content }
        });

        return res.status(201).json({ msg: "Note Updated!" });
    } catch (e) {
        return res.status(400).json({ msg: "Failed to update!" });
    }
});

router.post("/api/note/delete", isAuthorized, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, courseId, noteId } = req.body;
    const customid = courseId + lessonId + userId;

    try {
        const list = await Note.findOneAndDelete({
            _id: noteId,
            customId: customid
        });

        return res.status(200).json({ msg: "Note deleted!" });
    } catch (e) {
        return res.status(400).json({ msg: "Failed to delete!" });
    }
});

router.get("/api/course", async (req, res) => {
    const courses = await Course.find({});
    if (!courses.length) {
        return res.status(400).json({ error: "Can't find any courses" });
    }
    return res.status(200).json(courses);
})

router.get("/api/course/detail/:_id", async (req, res) => {
    const courseId = req.params._id;
    const response = await Course.findById(courseId);
    if (!response) {
        return res.status(400).json({ msg: "No matching record!" });
    } else {
        return res.status(200).json(response);
    }
});

router.get("/api/course/play/:_id", isAuthorized, async (req, res) => {
    const courseId = req.params._id;
    const userId = req.user.id;
    const response = await Course.findById(courseId);
    const user = await User.findOne({ _id: userId });
    if (!response) {
        return res.status(400).json({ msg: "No matching record!" });
    } else {
        return res.status(200).json({ response, courseLoved: user.courseLoved, userId });
    }
});

router.post("/api/search/course", async (req, res) => {
    const { searchText } = req.body;

    const response = await Course.find(
        {
            "name":
                { $regex: '.*' + searchText + '.*', $options: 'i' }
        });

    if (!response) {
        return res.status(400).json({ msg: "Try again" });
    } else {
        if (response.length === 0) {
            return res.status(400).json({ msg: "Can't find course with matching name" });
        }
        return res.status(200).json(response);
    }
});

router.get("/api/recommended/course", async (req, res) => {
    const response = await Course.aggregate([{ $sample: { size: 4 } }]);


    if (!response) {
        return res.status(400).json({ msg: "Try again" });
    } else {
        if (response.length === 0) {
            return res.status(400).json({ msg: "Try again" });
        }
        return res.status(200).json(response);
    }
});

router.put('/api/lesson/complete', isAuthorized, async (req, res) => {
    const { lessonId } = req.body;
    const userId = req.user.id;
    const courseId = new mongoose.Types.ObjectId(req.body.courseId);

    try {
        // Find the user
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the lessonId already exists in the completed array for the given courseId
        const courseIndex = user.courseEnrolled.findIndex(course => course.courseId.equals(courseId));

        if (courseIndex === -1) {
            return res.status(404).send('Course not found');
        }

        const lessonIndex = user.courseEnrolled[courseIndex].completed.indexOf(lessonId);

        if (lessonIndex === -1) {
            user.courseEnrolled[courseIndex].completed.push(lessonId);
        } else {
            user.courseEnrolled[courseIndex].completed.splice(lessonIndex, 1);
        }

        await user.save();

        res.status(200).json(user.courseEnrolled[courseIndex].completed);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

router.get('/api/lesson/completed/:courseId', isAuthorized, async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    const lessons = user.courseEnrolled.find(course => course.courseId.equals(req.params.courseId));
    if (!user) {
        return res.status(404).send('Course not found');
    }
    return res.status(200).json(lessons.completed);
});

router.post("/api/new/course", async (req, res) => {

    const course_data = req.body.result;
    const key = req.body.api_key;

    const { name, creator, love, category, sub_category, course_pic, language, lessons } = course_data;
    let { info } = course_data
    const isVisible = true;

    if (key !== process.env.API_KEY) {
        return res.status(401).json({ error: "Invalid api key!" });
    }

    if (!name || !creator || !category || !sub_category || !language || !course_pic) {
        return res.status(422).json({ error: "Empty input fields!" });
    }

    if (!info) {
        info = name;
    }

    try {

        const course = new Course({
            name,
            creator,
            love,
            isVisible,
            category,
            sub_category,
            info,
            course_pic,
            language,
            lessons
        });
        await course.save();
        res.status(201).json({ msg: "Course added!" });

    } catch (err) {
        console.log(err);
        res.status(500).json("An error occured")
    }
});

router.post("/api/course/request", isAuthorized, async (req, res) => {
    const { name, email, playlist, message } = req.body;

    if (!name || !email || !playlist) {
        return res.status(422).json({ error: "Empty input fields!" });
    }

    try {
        const course = new newCourse({
            name,
            email,
            playlist,
            message
        });
        await course.save();
        res.status(201).json({ msg: "Request added!" });

    } catch (err) {
        console.log(err);
        res.status(500).json("An error occured")
    }
});

router.post("/api/request/list", isAuthorized, async (req, res) => {

    try {
        const list = await newCourse.find({});

        if (!list.length) {
            return res.status(400).json({ error: "Can't find any requests" });
        }
        return res.status(200).json(list);

    } catch (err) {
        console.log(err);
        res.status(500).json("An error occured")
    }
});

// Gemini MCQ generation endpoint
router.post("/api/gemini-mcq", isAuthorized, async (req, res) => {
    const { lessonName } = req.body;
    if (!lessonName) return res.status(400).json({ error: "lessonName is required" });
    try {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
        const prompt = `Generate 5 multiple choice questions (MCQs) with 4 options each and the correct answer for the lesson: \"${lessonName}\". Format as JSON: [{question, options:[], answer}]`;
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: prompt }] }]
        });
        // Parse and send only the MCQs part
        let text = response.data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        let mcqs = [];
        try {
            mcqs = JSON.parse(text);
        } catch (e) {
            return res.status(500).json({ error: "Failed to parse MCQs from Gemini response", raw: text });
        }
        res.json({ mcqs });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: "Failed to generate MCQs" });
    }
});

module.exports = router;