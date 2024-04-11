const User = require("../models/user");

const becomeMemberController = async (req, res) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, { hasMembership: true });
        res.redirect("/");
    } catch (error) {
        console.error("Error updating membership status:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = becomeMemberController;
