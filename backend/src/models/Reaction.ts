import mongoose from "mongoose";

const options = { discriminatorKey: "kind" };

const reactionSchema = new mongoose.Schema(
  {
    from: {
      _id: mongoose.SchemaTypes.ObjectId,
      name: String,
      email: String,
    },
    target: String,
    text: String,
  },
  options
);
//todo: fix any
const Reaction: any = mongoose.model("Reaction", reactionSchema);

const EmotionReaction = Reaction.discriminator(
  "EmotionReaction",
  new mongoose.Schema({ emotion: String }, options)
);

export { Reaction, EmotionReaction };
