const passport = require("passport");

const logInController = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
});

module.exports = logInController;
