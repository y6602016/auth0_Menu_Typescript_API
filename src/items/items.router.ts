// Required External Modules and Interfaces
import express, { Request, Response, NextFunction } from "express";
import { checkJWT } from "../middleware/authz.middleware";
import Controller from "../items/items.controller";

// Router Definition
export const itemsRouter = express.Router();

// Controller Definitions

// GET and POST of "items/" route
itemsRouter
  .route("/")
  .get(Controller.getItem)
  .post(checkJWT, Controller.createItem);

// GET and PUT and DELETE of "items/:id" route
itemsRouter
  .route("/:id")
  .get(Controller.getDetail)
  .put(checkJWT, Controller.updateDatail)
  .delete(checkJWT, Controller.deleteDetail);
