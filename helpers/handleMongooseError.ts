import { NextFunction } from "express";
import { ErrorExpanded } from "types/types";
interface IHandleMongoosError {
  error: ErrorExpanded | undefined;
  data:any;
  next: NextFunction | undefined;
}

export const handleMongooseError = ({error, data, next}:IHandleMongoosError) => {
  console.log(error);
  if(error !== undefined && next !== undefined) {
    const { name, code } = error;
    const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
    error.status = status;
    next();
  }
};
