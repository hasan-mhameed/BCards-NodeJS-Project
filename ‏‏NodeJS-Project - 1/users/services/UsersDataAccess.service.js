import User from "../models/User.schema.js";
import { hashPassword, comparePassword } from "../services/Password.service.js";
import { generateToken } from "../../services/auth.service.js";

const getAll = async () => {
  return User.find();
};

const getOne = async (id) => {
  const user = User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const register = async (userData) => {
  const newUser = new User(userData);
  const usedEmail = await User.findOne({ email: newUser.email });

  if (usedEmail) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await hashPassword(newUser.password);
  newUser.password = hashedPassword;

  return newUser.save();
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = generateToken(user);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const remove = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return `User ${user.email} deleted`;
};

const changeAuthLevel = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  user.isBusiness = user.isBusiness === false ? true : false;
  return user.save();
};
export { login, changeAuthLevel, getAll, getOne, register, update, remove };
