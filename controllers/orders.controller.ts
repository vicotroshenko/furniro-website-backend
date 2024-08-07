import { Request, Response } from "express";
import OrderService from "../services/orders.service";
import { ErrorMessage, ErrorStatus } from "../constants/http.constant";

export class OrdersController {
  constructor(private orderService: OrderService) {}

  async getListOfOrders(req: Request, res: Response) {
    const { page = 1, limit = 16, price, date } = req.query;
    const skip = (+page - 1) * +limit;
    const sortByPrice = price ? { totalPrice: Number(price) } : {};
    const sortByDate = date ? { createdAt: Number(date) } : {};

    const result = await this.orderService.getAll({
      skip,
      limit: +limit,
      sort: {
        ...sortByPrice,
        ...sortByDate,
      },
    });

    res.json(result);
  }

  async getOrder(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.orderService.getOne(id);
    res.json(result);
  }

  async addOrder(req: Request, res: Response) {
    let random = Math.random().toString(36).slice(2, 7).toUpperCase();
    let date = new Date();
    const orderNumber =
      date.toLocaleDateString().replaceAll(".", "") + "-" + random;

    const data = { ...req.body, orderNumber, createdAt: date.toString() };

    const result = await this.orderService.create(data);

    res.status(ErrorStatus.CREATED).json(result);
  }

  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.orderService.updateById(id, req.body);
    res.json(result);
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    await this.orderService.deleteOne(id);
    res.json({
      message: ErrorMessage.DELETED,
    });
  }
}

const orderController = new OrdersController(new OrderService());
export default orderController;
