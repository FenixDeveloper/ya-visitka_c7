import mongoose, { ObjectId } from "mongoose";

const { Schema } = mongoose;

interface IStudent {
  _id: ObjectId;
  name: string;
  email: string;
}

const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    _id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { _id: false }
);

export const reactionSchema = new Schema(
  {
    from: studentSchema,
    target: { type: String },
  },
  { discriminatorKey: "type" }
);
//todo: fix any
const reaction: any = mongoose.model("Reaction", reactionSchema);

const TextSchema = new Schema({
  text: {
    type: String,
    maxlength: 200,
  },
});

const EmotionSchema = new Schema({
  emotion: {
    type: String,
    maxlength: 200,
  },
});

export const Text = reaction.discriminator("Text", TextSchema);
export const Emotion = reaction.discriminator("Emotion", EmotionSchema);
