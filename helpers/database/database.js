require("dotenv").config()
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL || "";

const connectToDB = async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Database connected!")).catch(err => console.log(err));
};

module.exports = {
    connectToDB,
};