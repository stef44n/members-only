const express = require("express");
const router = express.Router();
// const passport = require("passport");
// const bcryptjs = require("bcryptjs");
// const User = require("../models/user");
// const Message = require("../models/message");

const signUpController = require("../controllers/signUpController");
const logInController = require("../controllers/logInController");
const becomeMemberController = require("../controllers/becomeMemberController");
const logOutController = require("../controllers/logOutController");
const deleteMessageController = require("../controllers/deleteMessageController");
const displayMessagesController = require("../controllers/displayMessagesController");

// Routes
router.get("/sign-up", (req, res) => {
    res.render("sign-up-form");
});

router.post("/sign-up", signUpController);

router.post("/log-in", logInController);

router.post("/become-member", isLoggedIn, becomeMemberController);

router.get("/log-out", logOutController);

router.post("/delete-message/:id", isMember, deleteMessageController);

router.get("/", displayMessagesController);

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login"); // Redirect to login page if not authenticated
}

// Middleware to check if the user is authenticated and has membership
function isMember(req, res, next) {
    if (req.isAuthenticated() && req.user.hasMembership) {
        return next(); // User is authenticated and has membership
    }
    res.redirect("/"); // Redirect to home page if not authorized
}

// Export router
module.exports = router;
