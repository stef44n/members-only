const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Virtual for message's URL
MessageSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/message/${this._id}`;
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
