import { isValidObjectId, Model } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../helpers";
import { ErrorStatus } from "../constants/http.constant";

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(new HttpError(ErrorStatus.BAD_REQUEST, `${id} is not valid id`));
  }

  next();
};

export default isValidId;
