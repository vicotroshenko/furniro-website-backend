import { Request, Response } from "express";
import { ctrlWrapper } from "../helpers/ctrlWrapper";
import { HttpError } from "../helpers/HttpError";
import Order from "../models/order";

const getListOfOrders = async (req: Request, res: Response) => {
	const { page=1, limit=16, price, date } = req.query;
	const skip = (+page - 1) * +limit;
	const sortByPrice = price ? { totalPrice:Number(price) } : {};
	const sortByDate = date ? { createdAt:Number(date) } : {};

	const result = await Order.find(
    {},
    null,
    {
      skip,
      limit: Number(limit),
			sort: {...sortByPrice, ...sortByDate},
    }
  ).exec();

	if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

const addOrder = async (req: Request, res: Response) => {
  let random = Math.random().toString(36).slice(2, 7).toUpperCase();
  let date = new Date();
  const orderNumber =
    date.toLocaleDateString().replaceAll(".", "") + "-" + random;

  const data = { ...req.body, orderNumber, createdAt: date.toString() };

  const result = await Order.create(data);
  res.status(201).json(result);
};

const updateOrder = async (req: Request, res: Response) => {
	const { id } = req.params;
  const result = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
  }).exec();

	console.log(result);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}


const deleteOrder =  async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Order.findByIdAndDelete(id).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

export default {
  getListOfOrders: ctrlWrapper(getListOfOrders),
  addOrder: ctrlWrapper(addOrder),
  updateOrder: ctrlWrapper(updateOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
};