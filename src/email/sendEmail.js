import nodemailer from 'nodemailer';
import { emailTemplet } from './emailTemplet.js';
export async function  sendEmail(option){
  console.log(option);
  
    // gafa vysq sqih mydw
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
    user: "ahmedyoussef13018@gmail.com",
    pass: "atsl izjg pxuk dklv",
  },
});

// async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <ahmedyoussef13018@gmail.com>', // sender address
    to: option.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemplet(option.api), // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}