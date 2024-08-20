import mongoose from "mongoose";
export const connection = () => {
  mongoose
    .connect(process.env.CONNECTION)
    .then(() => {
      console.log("Connected To MongoDB");
    })
    .catch((err) => {
      console.log("Error Connecting To MongoDB", err);
    });
};
