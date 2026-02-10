const mongoose = require("mongoose");

// 1. Paste your Schema & Model here (or import it)
const courseSchema = new mongoose.Schema({
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

// 2. Database Connection
const MONGO_URI = "mongodb+srv://admin-ashish:F92VPbxU8fSDO58f@cluster0.umsehro.mongodb.net/Progify?retryWrites=true&w=majority&appName=Cluster0"; // REPLACE THIS

async function migrate() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB...");

        // Access the raw collection to avoid Mongoose casting errors during read
        const rawCollection = mongoose.connection.db.collection('courses');
        
        // Find all documents. You can add a filter if you only want to target String IDs
        const cursor = rawCollection.find({});
        const allCourses = await cursor.toArray();

        console.log(`Found ${allCourses.length} documents to process.`);

        for (const doc of allCourses) {
            // Check if the _id is actually a String (e.g. "3")
            if (typeof doc._id === 'string') {
                console.log(`Migrating Course: ${doc.name} (Old ID: ${doc._id})`);

                // Create a copy of the data WITHOUT the old _id and __v
                const { _id, __v, ...courseData } = doc;

                // Create new Mongoose document (Mongoose will auto-generate a new ObjectId)
                const newCourse = new Course(courseData);
                const savedCourse = await newCourse.save();

                console.log(` -> Created new doc with ID: ${savedCourse._id}`);

                // Delete the old document using the raw collection
                await rawCollection.deleteOne({ _id: doc._id });
                console.log(` -> Deleted old doc with ID: ${doc._id}`);
            } else {
                console.log(`Skipping ${doc.name} (Already has valid ObjectId)`);
            }
        }

        console.log("Migration Complete!");
        process.exit(0);

    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();