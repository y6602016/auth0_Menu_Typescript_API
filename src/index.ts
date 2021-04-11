// Required External Modules
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

// App Variables
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

// json populates the request object with a new body object containing the parsed data
// that's why we can use req.body
// use express.json() can parse the json content
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// App Configuration
// mount the middlewaresMENU
app.use(cors());
app.use(helmet());

// Express app involke the itemsRouter middleware functions whenever the
// "api/menu/items" route path is requested
app.use("/api/menu/items", itemsRouter);

// error hanler middleware must be placed after the router
app.use(errorHandler);
app.use(notFoundHandler);

// Server Activation
app.listen(PORT, (): void => {
  console.log(`Listening on port ${PORT}`);
});
