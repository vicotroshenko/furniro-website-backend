import { Request, Response } from "express";
import { nanoid } from "nanoid";
import FurnitureService from "../services/furniture.service";
import { IReview } from "types/furnityre.type";
import { HttpError } from "../helpers";
import { ErrorMessage, ErrorStatus } from "../constants/http.constant";

export class FurnitureController {
  constructor(private furnitureService: FurnitureService) {}

  async listFurniture(req: Request, res: Response) {
    const result = await this.furnitureService.getAll({
      ...req.query,
    });

    res.json(result);
  }

  async addFurniture(req: Request, res: Response) {
    const result = await this.furnitureService.create(req.body);
    res.status(ErrorStatus.CREATED).json(result);
  }

  async getFurnitureById(req: Request, res: Response) {
    const result = await this.furnitureService.getOne(req.params.id);
    if (!result) {
      throw new HttpError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }
    res.json(result);
  }

  async getDistinctInfo(req: Request, res: Response) {
    const { part } = req.params;
    const result = await this.furnitureService.getDistinct(part);
    if (!result) {
      throw new HttpError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }
    res.json(result);
  }

  async updateFurnitureById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.furnitureService.updateById(id, req.body);
    if (!result) {
      throw new HttpError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }
    res.json(result);
  }

  async deleteFurnitureById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.furnitureService.deleteOne(id);
    if (!result) {
      throw new HttpError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }
    res.json({
      message: ErrorMessage.DELETED,
    });
  }

  async updateRating(req: Request, res: Response) {
    const { id, ...body } = req.body;
    const isItemExist = await this.furnitureService.getOne(req.params.id);
    if (!isItemExist) {
      throw new HttpError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }

    const thisUserRatingExist = isItemExist.rating?.find(
      (item) => item.id === id
    );

    const rating = thisUserRatingExist
      ? { ...thisUserRatingExist, ...body }
      : { id: nanoid(), ...body };

    const result = await this.furnitureService.updateById(req.params.id, {
      ...isItemExist,
      rating,
    });

    res.json(result);
  }

  async updateReview(req: Request, res: Response) {
    const { id, ...body } = req.body;
    const isItemExist = await this.furnitureService.getOne(req.params.id);

    if (!isItemExist) {
      throw new HttpError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }

    const itemReviews = isItemExist.reviews as IReview[];
    const date = new Date();

    const reviews = id
      ? itemReviews.map((item) => {
          item.id === id
            ? {
                ...item,
                ...body,
              }
            : item;
        })
      : [
          ...itemReviews,
          { id: nanoid(), ...body, date: date.toLocaleDateString() },
        ];

    const result = await this.furnitureService.updateById(req.params.id, {
      reviews,
    });

    res.json(result);
  }

  async deleteReview(req: Request, res: Response) {
    const { id } = req.body;
    const isItemExist = await this.furnitureService.getOne(req.params.id);
    if (!isItemExist) {
      throw new HttpError(ErrorStatus.NOT_FOUND, ErrorMessage.NOT_FOUND);
    }
    const filteredReviews = isItemExist.reviews?.filter(
      (item) => item.id !== id
    );

    const result = await this.furnitureService.updateById(req.params.id, {
      ...isItemExist,
      reviews: filteredReviews,
    });

    res.json(result);
  }
}

const furnitureController = new FurnitureController(new FurnitureService());

export default furnitureController;
