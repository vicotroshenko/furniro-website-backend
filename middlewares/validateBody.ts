import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers/HttpError";


const validateBody = (schema: any) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    console.log("schema", error);
    if (error) {
      next(HttpError(400, "missing required name field"));
    }
    next();
  };
  return func;
};

export default validateBody;