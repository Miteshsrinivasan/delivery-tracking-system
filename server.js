const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://mmitesh698:1234@cluster0.8r4la.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000 // Increase timeout to 30 seconds
});

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.json({ success: true, message: "User already exists, redirecting..." });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ success: true, message: "Signup successful, redirecting..." });
});

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
