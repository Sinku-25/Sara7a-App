import * as dotenv from "dotenv";
dotenv.config({});
import express from "express";
import { connection } from "./db/connection.js";
import userRouter from "./src/modules/user/user.routes.js";
import messageRouter from "./src/modules/message/message.routes.js";
const app = express();
const port = 3000;
connection();
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);


app.use("*",(req,res,next)=>{
    next(new Error(`Invalid Url ${req.originalUrl}`));
})
 // Global Error Handling
app.use((err,req,res,next)=>{
    process.env.MODE == 'dev' ? res.json({err:err.message,stack:err.stack}) : res.json({err:err.message})
  
})
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
