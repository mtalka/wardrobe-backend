const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, "is invalid"], index: true },
    email: { type: String, select: false, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, "is invalid"], index: true },
    bio: String,
    image: String,
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
        select: false
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);