const express = require("express");
const router = express.Router();

const OwnedPiece = require("../models/ownedPiece");
const Outfit = require("../models/outfit");

router.get("/", (req, res) => {
    res.json({
        error: null,
        data: {
            title: "My dashboard",
            content: "dashboard content",
            user: req.user, // token payload information
        },
    });
});

// Create owned piece
router.post("/ownedPiece", async (req, res) => {
    const ownedPiece = new OwnedPiece(req.body);

    try {
        const newOwnedPiece = await ownedPiece.save();
        res.status(201).json(newOwnedPiece);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Create outfit
router.post("/outfit", async (req, res) => {
    const outfit = new Outfit(req.body);

    try {
        const newOutfit = await outfit.save();
        res.status(201).json(newOutfit);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

module.exports = router;