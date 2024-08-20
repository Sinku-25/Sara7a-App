import userModel from "../../../../db/models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../../email/sendEmail.js";

export const getAllUsers = async (req, res) => {
  let users = await userModel.find({});
  res.json({ message: "Founded", users });
};
export const signUp = async (req, res) => {
try {
  let { name, email, password } = req.body;
  let foundedUser = await userModel.findOne({ email });
  if (foundedUser) return res.json({ message: "User Already Exist" });
    let hashedPassword = bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    let addedUser = await userModel.insertMany({name,email,password:hashedPassword});
    let verifyEmail = jwt.sign({id:addedUser[0]._id},process.env.VERIFY_SECRET);
    sendEmail({email,api:`http://localhost:3000/api/v1/user/verify/${verifyEmail}`});
    res.json({ message: "addUser", addedUser });
} catch (error) {
  res.json({message:"Error",error});
}
  };
export const signIn = async (req, res) => {
  let { email, password } = req.body;
  let foundedUser = await userModel.findOne({ email });
  if (foundedUser) {
    if(foundedUser.verified){
    let matched = await bcrypt.compare(password,foundedUser.password)
    if (matched) {
      let token = jwt.sign({userId:foundedUser._id,name:foundedUser.name},process.env.SECRET_KEY)
      res.json({ message: "Wellcome",token });
    } else {
      res.json({ message: "Wrong Password" });
    }
  }else{
    res.json({ message: "Please verify email" });
  }
  } else {
    res.json({ message: "Email is not correct" });
  }
};
export const updateUser = async (req, res) => {
  let { _id, name } = req.body;
  let updated = await userModel.findByIdAndUpdate(_id, { name }, { new: true });
  res.json({ message: "updateUser", updated });
};
export const deleteUser = async (req, res) => {
  let { _id } = req.params;
  let deleted = await userModel.findByIdAndDelete(_id);
  res.json({ message: "deleteUser", deleted });
};

export const verifyEmail = (req,res)=>{
let {token} =req.params;
jwt.verify(token,process.env.VERIFY_SECRET,async (err,decoded)=>{
  if(err) return res.json({message:"Error Founded",err});
  let updatedUser = await userModel.findByIdAndUpdate(decoded.id,{verified:true},{new:true});
  res.json({message:"Success",updatedUser});
});

}

