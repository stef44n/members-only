const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const Message = require("../models/message");

// Sign-up route
router.get("/sign-up", (req, res) => {
    res.render("sign-up-form");
});

router.post("/sign-up", async (req, res, next) => {
    try {
        bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                hasMembership: req.body.hasMembership,
            });
            await user.save();
            res.redirect("/");
        });
    } catch (err) {
        next(err);
    }
});

// Log-in route
router.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
    })
);

// Route to handle updating user membership
router.post("/become-member", isLoggedIn, async (req, res) => {
    try {
        // Get the logged-in user ID
        const userId = req.user._id;

        // Find the user by ID and update the hasMembership property
        await User.findByIdAndUpdate(userId, { hasMembership: true });

        res.redirect("/"); // Redirect to the home page or any other page after updating membership
    } catch (error) {
        console.error("Error updating membership status:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login"); // Redirect to login page if not authenticated
}

// Log-out route
router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// Middleware to check if the user is authenticated and has membership
function isMember(req, res, next) {
    if (req.isAuthenticated() && req.user.hasMembership) {
        return next(); // User is authenticated and has membership
    }
    res.redirect("/"); // Redirect to home page if not authorized
}

// Route to handle deleting messages (only accessible to members)
router.post("/delete-message/:id", isMember, async (req, res) => {
    try {
        const messageId = req.params.id;
        // Find the message by ID and delete it
        await Message.findByIdAndDelete(messageId);
        res.redirect("/"); // Redirect to home page after deleting message
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to display messages
router.get("/", async (req, res) => {
    try {
        const messages = await Message.find();
        res.render("index", { user: req.user, messages: messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Export router
module.exports = router;
