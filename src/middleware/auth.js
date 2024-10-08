import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  let token = req.header("token");
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.json({ message: "Invalid Token", err });
    req.userId = decoded.userId;
    next();
  });
};
