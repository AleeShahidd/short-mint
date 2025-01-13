import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const SessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sessionToken: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: "7d" }, // Session expires in 7 days
  },
  { timestamps: true }
);

export default models.Session || model("Session", SessionSchema);
