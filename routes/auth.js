const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

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

// Log-out route
// router.get("/log-out", (req, res) => {
//     req.logout();
//     res.redirect("/");
// });
router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// Export router
module.exports = router;
