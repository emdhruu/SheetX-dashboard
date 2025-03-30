import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  columns: [
    {
      name: String,
      type: { type: String, enum: ["Text", "Date"], default: "Text" },
    },
  ],
});

const Column = mongoose.model("Columns", columnSchema);

export default Column;
