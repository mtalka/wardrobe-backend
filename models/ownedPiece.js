const mongoose = require("mongoose");

const OwnedPieceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    pieceId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    dateAcquired: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("OwnedPiece", OwnedPieceSchema);