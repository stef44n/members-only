const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const signUpController = async (req, res, next) => {
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
};

module.exports = signUpController;
