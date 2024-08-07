import { IOrderSchema } from "../types/orders.type";
import Order from "../models/order.model";

type GetALlQueryOrders = {
	skip: number;
	limit: number;
	sort: {[x: string]: string; } | {}
}
export default class OrderService {
  async getAll({ skip, limit, sort }: GetALlQueryOrders) {
    return await Order.find({}, null, {
      skip,
      limit,
      sort,
    }).exec();
  }

  async getOne(id: string) {
    return await Order.findByIdAndUpdate(id).exec();
  }
  async create(body: IOrderSchema) {
    return await Order.create(body);
  }

  async updateById(id: string, body: IOrderSchema) {
    return await Order.findByIdAndUpdate(id, body, {
      new: true,
    }).exec();
  }

  async deleteOne(id: string) {
    return await Order.findByIdAndDelete(id).exec();
  }
}