const {mongoose} = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true
        },
        images: [String],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"]
        },
    },
    {timestamps: true}
);

exports.Post = mongoose.model("Post", postSchema)