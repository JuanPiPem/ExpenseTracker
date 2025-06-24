// models/Income.js
import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false, // Made optional temporarily
    },
    category: {
      type: String,
      enum: ["contribution", "refund", "payment", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
