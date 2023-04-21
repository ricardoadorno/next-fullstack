import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default models.Note || model("Note", NoteSchema);
