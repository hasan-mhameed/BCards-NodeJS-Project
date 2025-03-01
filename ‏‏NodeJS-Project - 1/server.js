import express from "express";
import router from "./Router/router.js";
import { Logger } from "./middlewares/logger.js";
import chalk from "chalk";
import { badRequest } from "./middlewares/badRequest.js";
import { conn } from "./services/db.service.js";
import { ErrorHandler } from "./middlewares/errorHandler.js";
import { createInitialData } from "./services/initialData.service.js";
import { createInitialCardsData } from "./cards/services/initialCardsData.service.js";

const app = express();
const PORT = 8080;

// Add middleware to parse JSON, Maximum request body size is 5MB
app.use(express.json({ limit: "5mb" }));

app.use(Logger);

// Add the router to the app
app.use(router);

// Add middleware to handle 404 errors
app.use(badRequest);

// Add middleware to handle 500 errors
app.use(ErrorHandler);

app.listen(PORT, async () => {
  console.log("Server is Running");
  await conn();
  await createInitialData();
  await createInitialCardsData();
});
