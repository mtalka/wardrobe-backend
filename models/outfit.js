const mongoose = require("mongoose");

const OutfitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pieces: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    description: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Outfit", OutfitSchema);