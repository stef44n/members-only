const express = require("express");
const router = express.Router();
const Message = require("../models/message");

/* GET home page. */
router.get("/", async (req, res) => {
    try {
        // Fetch messages from the database
        // const messages = await Message.find();
        const messages = await Message.find().populate("user");

        // Render the view and pass messages data to it
        res.render("index", { user: req.user, messages: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
