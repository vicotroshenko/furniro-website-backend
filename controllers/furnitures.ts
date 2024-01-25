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
  const result = await Furniture.find().exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

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
  const resultItem = await Furniture.find({ id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  const [object] = resultItem;

  if (!object.rating) {
    throw HttpError(404, "Not found");
  }
  const rating = { id: nanoid(), ...body };
  const newRating = [...object.rating, rating];

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
  const resultItem = await Furniture.find({ id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  const [object] = resultItem;

  if (!object.rating) {
    throw HttpError(404, "Not found");
  }
  const updatedRating = object.rating.map((element) => {
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
  const resultItem = await Furniture.find({ id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  const [object] = resultItem;

  if (!object.rating) {
    throw HttpError(404, "Not found");
  }

  const ratingRemoved = object.rating.filter(
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
  const resultItem = await Furniture.find({ id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  const [object] = resultItem;

  if (!object.reviews) {
    throw HttpError(404, "Not found");
  }

  if (!body.date) {
    body.date = new Date();
  }

  const review = { id: nanoid(), ...body };
  const newReview = [...object.reviews, review];

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
  const resultItem = await Furniture.find({ id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  const [object] = resultItem;

  if (!object.reviews) {
    throw HttpError(404, "Not found");
  }
  const updatedReview = object.reviews.map((element) => {
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
  const resultItem = await Furniture.find({ id });
  if (!resultItem) {
    throw HttpError(404, "Not found");
  }

  const [object] = resultItem;

  if (!object.reviews) {
    throw HttpError(404, "Not found");
  }

  const reviewRemoved = object.reviews.filter(
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
  updateFurnitureById: ctrlWrapper(updateFurnitureById),
  deleteFurnitureById: ctrlWrapper(deleteFurnitureById),
  addRating: ctrlWrapper(addRating),
  updateRating: ctrlWrapper(updateRating),
  deleteRating: ctrlWrapper(deleteRating),
  addReview: ctrlWrapper(addReview),
  updateReview: ctrlWrapper(updateReview),
  deleteReview: ctrlWrapper(deleteReview),
};
