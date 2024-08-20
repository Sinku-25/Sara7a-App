import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "name is too short"], // Corrected this line
      required: true,
    },
    email: {
      type: String, // Corrected this line
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: [4, "password is too short"],
      maxLength: [100, "password is too long"],
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
