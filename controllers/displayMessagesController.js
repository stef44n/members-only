const Message = require("../models/message");

const displayMessagesController = async (req, res) => {
    try {
        const messages = await Message.find();
        res.render("index", { user: req.user, messages: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = displayMessagesController;
