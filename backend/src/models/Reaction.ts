import mongoose from 'mongoose';
import { IStudent } from '../types/reaction-model';

const { Schema } = mongoose;

const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    _id: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  },
  { _id: false },
);

export const reactionSchema = new Schema(
  {
    from: studentSchema,
    target: {
      type: String,
      enum: ['hobby', 'status', 'job', 'edu', 'quote', null],
    },
  },
  { discriminatorKey: 'type' },
);

// Проблема с типом, пока поставили any
const reaction: any = mongoose.model('Reaction', reactionSchema);

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

export const Text = reaction.discriminator('Text', TextSchema);
export const Emotion = reaction.discriminator('Emotion', EmotionSchema);
