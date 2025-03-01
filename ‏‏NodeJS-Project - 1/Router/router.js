import { Router } from "express";
import usersRouter from "../users/routes/users.routes.js";
import cardsRouter from "../cards/routes/cards.routes.js";

const router = Router();

router.get("/", (reg, res) => {
  res.send("Hellow World!!!");
});

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);

export default router;
