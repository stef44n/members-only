const express = require("express");
const router = express.Router();
const createMessage =
    // deleteMessage,
    require("../controllers/messageController");

// Route for creating a new message
router.post("/", createMessage);

// Route for deleting a message
// router.delete("/:id", deleteMessage);

module.exports = router;
