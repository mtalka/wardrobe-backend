const express = require("express");
const jwt = require("jsonwebtoken");

// validation
const { registerValidation, loginValidation } = require("../validation");

//encryption with bcrypt
const bcrypt = require("bcryptjs");

const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    // validate the user
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: "Email already exists" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password // Hashed password
    });

    try {
        const savedUser = await user.save();
        res.json({ error: null, data: savedUser });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// login route
router.post("/login", async (req, res) => {
    // validate the user
    const { error } = loginValidation(req.body);
    
    // throw validation errors
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    // throw error when email is wrong
    if (!user) return res.status(400).json({ error: "User not found" });

    // check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: "Password is wrong" });
    
    // create token
    const token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).json({
        error: null,
        data: {
            token,
        },
    });
});

module.exports = router;
