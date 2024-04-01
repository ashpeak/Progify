const mongoose = require("mongoose");

// const url = process.env.DATABASE;
const url = process.env.DATABASE;

mongoose.connect(url).then(() => {
    console.log("Connection successful");
}).catch((err) => console.log("No connection"));
