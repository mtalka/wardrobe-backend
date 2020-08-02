require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

// Routes
const piecesRoute = require("./routes/pieces");
app.use("/api/pieces", piecesRoute);

const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);

const dashboardRoute = require("./routes/dashboard");
const verifyToken = require("./routes/validate-token");
// this route is protected with token
app.use("/api/dashboard", verifyToken, dashboardRoute);


app.listen(9001, () => {
    console.log("Server has started");
});
