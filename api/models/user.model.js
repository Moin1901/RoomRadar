import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/originals/70/73/4d/70734de4417792aa5d7aecefd22d058a.jpg",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
