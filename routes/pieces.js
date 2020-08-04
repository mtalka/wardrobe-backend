const express = require("express");
const router = express.Router();

const Piece = require("../models/piece");

// Get all pieces
router.get("/", async (req, res) => {
    try {
        const pieces = await Piece.find();
        res.json(pieces);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get a single piece
router.get("/:id", getPiece, (req, res) => {
    res.send(res.piece);
});

// Create piece
router.post("/", async (req, res) => {
    const piece = new Piece(req.body);
    console.log(piece);

    try {
        const newPiece = await piece.save();
        res.status(201).json(newPiece);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});


// Find an entry by Id middleware
async function getPiece(req, res, next) {
    let piece;

    try {
        piece = await Piece.findById(req.params.id);
        if (piece == null) {
            return res.status(404).json({ message: "Cannot find piece" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

    res.piece = piece;
    next();
}

module.exports = router;