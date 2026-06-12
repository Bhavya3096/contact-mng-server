import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contact",
    required: true
  },
  note: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const NoteModel = mongoose.model("note", NoteSchema);