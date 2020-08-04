const mongoose = require("mongoose");

// enum pieceType {
//     Shoes = 0,
//     Socks = 1,
//     Underpants = 2,
//     Pants = 3,
//     TShirt = 4,
//     LongSleeve = 5,
//     Hoodie = 6,
//     Jacket = 7,
//     Accessory = 8,
//     Hat = 9,
//     Cap = 10
// }

const PieceSchema = new mongoose.Schema({
    pieceType: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color1: {
        type: String
    },
    color2: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Piece", PieceSchema);