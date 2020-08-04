const express = require("express");
const router = express.Router();

const User = require("../models/user");
const OwnedPiece = require("../models/ownedPiece");
const Outfit = require("../models/outfit");

// Get a single user
router.get("/:id", getUser, (req, res) => {
    res.send(res.user);
});

// Find an entry by Id middleware
async function getUser(req, res, next) {
    let user;

    try {
        user = await User.findById(req.params.id);
        ownedPieces = await OwnedPiece.find({ userId: req.params.id });
        outfits = await Outfit.find({ userId: req.params.id });
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

    res.user = {user, ownedPieces, outfits};
    next();
}

module.exports = router;