import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./env.service.js";

const generateToken = (user) => {
  const { _id, isBusiness, isAdmin } = user;
  const payloadData = { _id, isBusiness, isAdmin };
  const token = jwt.sign(payloadData, SECRET_KEY, { expiresIn: "1d" });
  return token;
};

const verifyToken = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, SECRET_KEY);
    return userData;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
