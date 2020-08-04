const express = require("express");
const router = express.Router();

const Outfit = require("../models/outfit");

// Get all outfits
router.get("/", async (req, res) => {
    try {
        const outfits = await Outfit.find();
        res.json(outfits);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get a single outfit
router.get("/:id", getOutfit, (req, res) => {
    res.send(res.outfit);
});

// Create outfit
router.post("/", async (req, res) => {
    const outfit = new Outfit(req.body);
    console.log(outfit);

    try {
        const newOutfit = await outfit.save();
        res.status(201).json(newOutfit);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});


// Find an entry by Id middleware
async function getOutfit(req, res, next) {
    let outfit;

    try {
        outfit = await Outfit.findById(req.params.id);
        if (outfit == null) {
            return res.status(404).json({ message: "Cannot find outfit" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

    res.outfit = outfit;
    next();
}

module.exports = router;