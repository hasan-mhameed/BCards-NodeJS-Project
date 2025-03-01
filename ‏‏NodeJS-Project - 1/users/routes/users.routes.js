import { Router } from "express";
import { users } from "../../data/users.js";
import User from "../models/User.schema.js";
import {
  login,
  changeAuthLevel,
  getAll,
  getOne,
  register,
  update,
  remove,
} from "../services/UsersDataAccess.service.js";

import { LoginSchema } from "../validations/loginUser.schema.js";
import { validate } from "../../middlewares/validation.js";
import { RegisterSchema } from "../validations/RegisterSchema.js";
import { auth } from "../../middlewares/auth.js";
import { isUser } from "../../middlewares/isUser.js";

const usersRouter = Router();

usersRouter.get("/", auth, isUser, async (req, res) => {
  try {
    const users = await getAll();
    return res.json(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

usersRouter.get("/:id", auth, isUser, async (req, res) => {
  try {
    const user = await getOne(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

usersRouter.post("/login", validate(LoginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginMessage = await login(email, password);
    return res.json({ message: loginMessage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

usersRouter.post("/", validate(RegisterSchema), async (req, res) => {
  try {
    const newUser = await register(req.body);
    return res.json({ message: "User registered", newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

usersRouter.put("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await update(id, user);

    return res.json({ message: "User updated", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

usersRouter.delete("/:id", auth, isUser, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = remove(id);

    return res.json({ message: "User Deleted", deletedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

usersRouter.patch("/:id", auth, isUser, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await changeAuthLevel(id);

    return res.json({ message: "Auth Level updated", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default usersRouter;
