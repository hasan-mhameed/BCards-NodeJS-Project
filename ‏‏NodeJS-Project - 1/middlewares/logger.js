import morgan from "morgan";
import chalk from "chalk";

// Creat a custom logger middleware
export const Logger = morgan((tokens, req, res) => {
  const color = res.statusCode >= 400 ? chalk.red : chalk.green;
  return [
    color(tokens.method(req, res)),
    color(tokens.url(req, res)),
    color(tokens.status(req, res)),
    chalk.cyan(new Date().toLocaleDateString()),
    chalk.cyan(new Date().toLocaleTimeString()),
    tokens["response-time"](req, res) + "ms",
  ].join(" | ");
});
