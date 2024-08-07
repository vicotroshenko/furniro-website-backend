import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers";
import { ErrorMessage, ErrorStatus } from "../constants/http.constant";

const validateBody = (schema: any) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    console.log("schema", error);
    if (error) {
      next(new HttpError(ErrorStatus.BAD_REQUEST, ErrorMessage.MISSING_FIELD));
    }
    next();
  };
  return func;
};

export default validateBody;
