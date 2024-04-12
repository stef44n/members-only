const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");
require("dotenv").config();
// console.log(process.env);

const mongoDb = process.env.SECRET_KEY;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
db.once("open", () => {
    console.log("Connected to MongoDB");
    // console.log(db.collections);
});

const User = require("./models/user");
// const Message = require("./models/message");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            const match = await bcryptjs.compare(password, user.password);
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            if (!match) {
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//ROUTES
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const messageRouter = require("./routes/messages");

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", messageRouter);

// app.post("/", async (req, res) => {
//     try {
//         const message = new Message({
//             title: req.body.title,
//             content: req.body.content,
//             user: res.locals.currentUser,
//         });
//         await message.save();
//         res.redirect("/");
//     } catch (err) {
//         console.error(err);
//     }
// });

app.listen(3000, () => console.log("app listening on port 3000!"));

module.exports = app;
