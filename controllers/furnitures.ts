import { Request, Response } from "express";
import Furniture from "../models/furniture";
import { ctrlWrapper } from "../helpers/ctrlWrapper";
import { HttpError } from "../helpers/HttpError";
import { nanoid } from "nanoid";

const addFurniture = async (req: Request, res: Response) => {
  const result = await Furniture.create(req.body);
  res.status(201).json(result);
};

const listFurnitures = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 16;
  const skip = (page - 1) * limit;
  const tags = req.query.tags ? {tags: { "$in": [`${req.query.tags}`]}} : {};
  const status = req.query.status ? {status: req.query.status} : {};
  const category = req.query.category ? {category: req.query.category} : {};
  const price = Number(req.query.price);
  const sortByPrice = req.query.price ? {price} : {}


  const result = await Furniture.find({...tags, ...status, ...category}, "-createdAt -updatedAt", {
    skip,
    limit,
    sort:{...sortByPrice}
  }).exec();

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const result = await Furniture.findById({_id:id}).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

const updateFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Furniture.findByIdAndUpdate(id, req.body, {
    new: true,
  }).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Furniture.findByIdAndDelete(id).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const addRating = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const resultItem = await Furniture.findById({ _id:id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  if (!resultItem.rating) {
    throw HttpError(404, "Not found");
  }
  const rating = { id: nanoid(), ...body };
  const newRating = [...resultItem.rating, rating];

  const result = await Furniture.findByIdAndUpdate(
    id,
    { rating: newRating },
    {
      new: true,
    }
  ).exec();

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(rating);
};

const updateRating = async (req: Request, res: Response) => {
  const { id, ratItem } = req.params;
  const { body } = req;
  const resultItem = await Furniture.findById({ _id:id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  if (!resultItem.rating) {
    throw HttpError(404, "Not found");
  }
  const updatedRating = resultItem.rating.map((element) => {
    if (element.id === ratItem) {
      return { ...element, ...body };
    } else {
      return element;
    }
  });

  const result = await Furniture.findByIdAndUpdate(
    id,
    { rating: updatedRating },
    {
      new: true,
    }
  ).exec();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedRating);
};

const deleteRating = async (req: Request, res: Response) => {
  const { id, ratItem } = req.params;
  const resultItem = await Furniture.findById({ _id:id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  if (!resultItem.rating) {
    throw HttpError(404, "Not found");
  }

  const ratingRemoved = resultItem.rating.filter(
    (element) => element.id !== ratItem
  );

  const result = await Furniture.findByIdAndUpdate(
    id,
    { rating: ratingRemoved },
    {
      new: true,
    }
  ).exec();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(ratingRemoved);
};

const addReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const resultItem = await Furniture.findById({ _id:id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  if (!resultItem.reviews) {
    throw HttpError(404, "Not found");
  }

  if (!body.date) {
    body.date = new Date();
  }

  const review = { id: nanoid(), ...body };
  const newReview = [...resultItem.reviews, review];

  const result = await Furniture.findByIdAndUpdate(
    id,
    { reviews: newReview },
    {
      new: true,
    }
  ).exec();

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(review);
};

const updateReview = async (req: Request, res: Response) => {
  const { id, reveiwItem } = req.params;
  const { body } = req;
  const resultItem = await Furniture.findById({ _id:id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  if (!resultItem.reviews) {
    throw HttpError(404, "Not found");
  }
  const updatedReview = resultItem.reviews.map((element) => {
    if (element.id === reveiwItem) {
      return { ...element, ...body };
    } else {
      return element;
    }
  });

  const result = await Furniture.findByIdAndUpdate(
    id,
    { rating: updatedReview },
    {
      new: true,
    }
  ).exec();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedReview);
};

const deleteReview = async (req: Request, res: Response) => {
  const { id, reveiwItem } = req.params;
  const resultItem = await Furniture.findById({ _id:id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  if (!resultItem.reviews) {
    throw HttpError(404, "Not found");
  }

  const reviewRemoved = resultItem.reviews.filter(
    (element) => element.id !== reveiwItem
  );

  const result = await Furniture.findByIdAndUpdate(
    id,
    { rating: reviewRemoved },
    {
      new: true,
    }
  ).exec();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(reviewRemoved);
};

export default {
  addFurniture: ctrlWrapper(addFurniture),
  listFurnitures: ctrlWrapper(listFurnitures),
  getFurnitureById: ctrlWrapper(getFurnitureById),
  updateFurnitureById: ctrlWrapper(updateFurnitureById),
  deleteFurnitureById: ctrlWrapper(deleteFurnitureById),
  addRating: ctrlWrapper(addRating),
  updateRating: ctrlWrapper(updateRating),
  deleteRating: ctrlWrapper(deleteRating),
  addReview: ctrlWrapper(addReview),
  updateReview: ctrlWrapper(updateReview),
  deleteReview: ctrlWrapper(deleteReview),
};
