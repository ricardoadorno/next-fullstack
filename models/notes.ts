import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export default models.Note || model("Note", NoteSchema);
