const express = require("express");
const router = express.Router();
require("../DB/conn");
const Note = require("../model/userNoteSchema");
const Course = require("../model/courseSchema");
const User = require("../model/userSchema");
const passport = require("passport");


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

router.get("/dashboard", isAuthorised, async (req, res) => {
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
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).json({ error: "User already exists!" });
    }

    const { name, password } = req.body;
    if (name.length > 20 || name.length < 5 || password.length < 8) {
        return res.status(400).json({ error: "Invalid Input!" });
    }
    try {
        await User.create(req.body);
        res.status(201).json({ msg: "Registration sucessfull!" });
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', (req, res) => {
    passport.authenticate('local',
        (err, user, info) => {

            if (err || !user) {
                return res.status(401).json({ msg: "login Unsuccessful" });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return res.status(401).json({ msg: "login Unsuccessful" });
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

router.get("/course", async (req, res) => {
    const courses = await Course.find();
    if (!courses.length) {
        return res.status(400).json({ error: "Can't find any courses" });
    }
    return res.status(200).json(courses);
})

router.get("/course/:_id", async (req, res) => {
    const courseId = req.params._id;
    const response = await Course.findById(courseId);
    if (!response) {
        return res.status(400).json({ msg: "No matching record!" });
    } else {
        return res.status(200).json(response);
    }
});

router.post("/search", async (req, res) => {
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

router.get("/recommend", async (req, res) => {
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

module.exports = router;