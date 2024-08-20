import mongoose, { Types } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    messageText: {
      type: String,
      minLength: [3, "message is too short"],
      required: true, // Corrected this line
    },
    receivedId: { // Corrected the typo in the field name
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

 const messageModel = mongoose.model("Message", messageSchema);
 export default messageModel;
