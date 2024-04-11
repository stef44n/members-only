const Message = require("../models/message");

const deleteMessageController = async (req, res) => {
    try {
        const messageId = req.params.id;
        await Message.findByIdAndDelete(messageId);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = deleteMessageController;
