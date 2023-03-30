import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  email: String,
  cohort: String,
  profile: {
    name: String,
    photo: String,
    city: {
      name: String,
      geocode: [Number],
    },
    birthday: Date,
    quote: String,
    telegram: String,
    github: String,
    template: String,
  },
  info: {
    hobby: {
      text: String,
      image: String,
    },
    status: {
      text: String,
      image: String,
    },
    job: {
      text: String,
      image: String,
    },
    edu: {
      text: String,
      image: String,
    },
  },
  reactions: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
});

export default mongoose.model("User", userSchema);
