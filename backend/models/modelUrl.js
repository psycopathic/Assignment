import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  visits: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,  // every URL must have an owner
  },
}, { timestamps: true });

export const Url = mongoose.model("Url", urlSchema);
