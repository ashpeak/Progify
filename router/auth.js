require("dotenv").config({ path: "../config.env" });
const express = require("express");
const router = express.Router();
require("../DB/conn");
const crypto = require("crypto");
const passport = require("passport");
const Course = require("../model/courseSchema");
const Note = require("../model/userNoteSchema");
const User = require("../model/userSchema");
const Token = require("../model/tokenSchema");
const sendEmail = require("../utils/sendEmail");
const newCourse = require("../model/newCourseReq");


const isAuthorised = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ msg: "Unauthorized" });
}

router.get("/logout", (req, res) => {
    req.logout((error) => {
        if (!error) return res.status(200).json({ msg: "Logged Out!" });
        return res.status(400).json({ msg: "Error!" });
    })
})

router.get("/api/users/dashboard", isAuthorised, async (req, res) => {
    let { courseEnrolled } = req.user;
    const { courseLoved } = req.user;

    courseEnrolled = courseEnrolled.map(course => course.courseId);

    try {
        const result = await Course.find({ _id: { $in: courseEnrolled } });

        return res.status(200).json({ result, courseLoved });
    } catch (error) {
        return res.status(400).json({ msg: "Not Found, don't exists or might removed" });
    }
})

router.post("/user/course/loved", isAuthorised, async (req, res) => {
    const id = req.body.id;
    const user_id = req.user.id;

    try {
        const result = await User.updateOne(
            { _id: user_id },
            { $addToSet: { courseLoved: id } }
        );

        if (result.modifiedCount === 1) {
            const newData = await Course.findByIdAndUpdate(
                { _id: id },
                { $inc: { love: 1 } },
                { new: true }
            );
            return res.status(200).json({ love: newData.love });
        }

        return res.status(200).json({ msg: "done!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Failed!" });
    }
})

router.post("/user/course/unloved", isAuthorised, async (req, res) => {
    const id = req.body.id;
    const user_id = req.user.id;

    try {
        const result = await User.updateOne(
            { _id: user_id },
            { $pull: { courseLoved: id } }
        );

        if (result.modifiedCount === 1) {
            const newData = await Course.findByIdAndUpdate(
                { _id: id },
                { $inc: { love: -1 } },
                { new: true }
            );
            return res.status(200).json({ love: newData.love });
        }

        return res.status(200).json({ msg: "done!" });
    } catch (error) {
        return res.status(400).json({ msg: "Failed!" });
    }
})

router.get("/checklogin", isAuthorised, async (req, res) => {
    return res.status(200).json({ loggedin: true, name: req.user.name });
})

router.post("/enroll", isAuthorised, async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.body;
    const lastModule = "Yet to start";

    try {
        await User.findOneAndUpdate(
            { _id: userId },
            { $push: { courseEnrolled: { courseId, lastModule } } },
            { upsert: true }
        );
        return res.status(200).json({ msg: "Enrolled successfully!" });
    } catch (error) {
        res.status(404).json({ msg: "User not found! Try again." });
    }
})

router.post("/register", async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).json({ msg: "User already exists!" });
    }

    const { name, password } = req.body;
    if (name.length > 20 || name.length < 5 || password.length < 8 || password.length > 30) {
        return res.status(400).json({ msg: "Invalid Input!" });
    }
    try {
        user = await User.create(req.body);

        const token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        });

        token.save();

        const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.token}`;
        await sendEmail(user.username, "Confirm account", url, "VERIFY");

        res.status(201).json({ msg: "An Email sent to your account please verify" });
    } catch (err) {
        console.log(err);
    }
});

router.get("/api/users/:id/verify/:token", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) return res.status(400).json({ msg: "Invalid link!" });

        const token = await Token.findOne({
            userId: user.id,
            token: req.params.token
        });

        if (!token) return res.status(400).json({ msg: "Invalid link!" });

        await User.updateOne(
            { _id: user.id },
            { $set: { verified: true } }
        );

        await token.remove();

        return res.status(200).json({ msg: "Email verified successfully!" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error!" });
    }
});

router.get("/api/users/:email/reset/", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.email });

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
        await sendEmail(user.username, "Password Reset", url, "RESET");

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

router.post('/login', (req, res) => {
    passport.authenticate('local',
        async (err, user, info) => {

            if (err || !user) {
                return res.status(400).json({ msg: "login Unsuccessful" });
            }

            if (!user.verified) {
                let token = await Token.findOne({ userId: user.id });

                if (!token) {
                    const token = new Token({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString("hex")
                    });

                    token.save();

                    const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.token}`;
                    await sendEmail(user.username, "Confirm account", url, "VERIFY");
                }

                return res.status(400).json({ msg: "Account not verified, please verify!" });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return res.status(400).json({ msg: "login Unsuccessful" });
                }
                return res.status(200).json({ name: user.name });
            });

        })(req, res);
});

router.post("/note", isAuthorised, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, courseId } = req.body;
    const customId = courseId + lessonId + userId;

    try {
        const notes = await Note.find({ customId: customId });

        if (!notes.length) return res.status(404).json({ msg: "Notes empty!" });
        return res.status(200).json(notes);
    } catch (error) {
        console.log(error);
    }
});

router.post("/note/new", isAuthorised, async (req, res) => {
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

        res.status(201).json({ message: "note saved!" });

    } catch (err) {
        res.status(500).json("An error occured")
        console.log(err);
    }
});

router.post("/note/edit", isAuthorised, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, courseId, noteId, content } = req.body;
    const customid = courseId + lessonId + userId;

    try {
        const result = await Note.updateOne({
            _id: noteId,
            customId: customid
        }, {
            $set: { content: content }
        });

        return res.status(201).json({ msg: result.modifiedCount });
    } catch (e) {
        return res.status(400).json({ msg: 0 });
    }
});

router.post("/note/delete", isAuthorised, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, courseId, noteId } = req.body;
    const customid = courseId + lessonId + userId;

    try {
        const list = await Note.deleteOne({
            _id: noteId,
            customId: customid
        });

        return res.status(200).json({ msg: list.deletedCount });
    } catch (e) {
        return res.status(400).json({ msg: "0" });
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

router.post("/new/course", async (req, res) => {

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
        let _id = await Course.countDocuments({}) + 1;

        const isExist = await Course.findById(_id);
        if (isExist) {
            return res.status(422).json({ error: "Course with same ID not allowed" });
        }

        const course = new Course({
            _id,
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
        res.status(201).json({ message: "Course added!" });

    } catch (err) {
        console.log(err);
        res.status(500).json("An error occured")
    }
});

router.post("/course/request", isAuthorised, async (req, res) => {
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
        res.status(201).json({ message: "Request added!" });

    } catch (err) {
        console.log(err);
        res.status(500).json("An error occured")
    }
});


router.post("/request/list", isAuthorised, async (req, res) => {

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


module.exports = router;