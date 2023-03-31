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
const reaction: any = mongoose.model("reaction", reactionSchema);

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

export const Text = reaction.discriminator("text", TextSchema);
export const Emotion = reaction.discriminator("emotion", EmotionSchema);
