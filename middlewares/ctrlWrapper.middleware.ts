import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";

const ctrlWrapper =
  (ctrl: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default ctrlWrapper;
