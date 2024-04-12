const Message = require("../models/message");

// Controller function for creating a new message
const createMessage = async (req, res) => {
    try {
        const message = new Message({
            title: req.body.title,
            content: req.body.content,
            user: res.locals.currentUser, // Assuming user is already authenticated
            // user: req.user, // Assuming user is already authenticated
        });
        await message.save();
        res.redirect("/");
        // res.status(201).json(message);
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller function for deleting a message
// const deleteMessage = async (req, res) => {
//     try {
//         const messageId = req.params.id;
//         const deletedMessage = await Message.findByIdAndDelete(messageId);
//         if (!deletedMessage) {
//             return res.status(404).json({ error: "Message not found" });
//         }
//         res.json(deletedMessage);
//     } catch (error) {
//         console.error("Error deleting message:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

module.exports = createMessage;
