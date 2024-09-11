import messageModel from "../../../../db/models/message.model.js";
import userModel from "../../../../db/models/user.model.js";
import { sendEmail } from "../../../email/sendEmail.js";
import { handerError } from "../../../middleware/handelError.js";
export const addMessage = handerError(async (req, res, next) => {
  
    let { messageText, receivedId } = req.body;
    let existUser = await userModel.findById(receivedId);
    if (!existUser) return res.json({ message: "Invalid User" });
    let addedMessage = await messageModel.insertMany({
      messageText,
      receivedId,
    });
    res.json({ message: "Success", addedMessage });

});

export const getMessages = async (req, res) => {

  let allMessages = await messageModel.find({ receivedId: req.userId}).populate("receivedId","name");
  res.json({ message: "Successfully Founded", allMessages });
 
}
