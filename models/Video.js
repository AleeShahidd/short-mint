import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Comment Schema
const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

// Video Schema
const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    videoUrl: { type: String, required: true }, // Link to the video file
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who liked the video
    comments: [CommentSchema], // Embedded comments
    views: { type: Number, default: 0 }, // Video view count
    createdAt: { type: Date, default: Date.now }, // Upload timestamp
  },
  { timestamps: true }
);

// Export the model
export default models.Video || model("Video", VideoSchema);
