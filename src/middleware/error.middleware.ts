import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

// 4 arguments are required to identify an error handling function
export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;

  res.status(status).send(error);
};

// not existing routes are not considered as errors by Express
// Express doesn't call errorHandler to handle 404 error
// it's required to create an additional middleware function to catch 404
