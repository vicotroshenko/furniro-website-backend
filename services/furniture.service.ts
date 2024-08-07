import { getParamsFromString } from "../helpers";
import Furniture from "../models/furniture.model";
import { IFurnitureSchema } from "../types/furnityre.type";

type GetAllQueryFurniture = {
  page?: number;
  limit?: number;
  price?: string;
  status?: string;
  tags?: string[];
  category?: string[];
};

export default class FurnitureService {
  async getAll({
    page = 1,
    limit = 16,
    price,
    status,
    tags,
    category,
  }: GetAllQueryFurniture) {
    const statusItem = status ? { status } : {};
    const skip = (+page - 1) * +limit;
    const sortByPrice = price ? { price: +price } : {};

    const tagsDivided = getParamsFromString(tags ?? [])
      ? { tags: { $in: getParamsFromString(tags ?? []) } }
      : {};
    const categoryDivided = getParamsFromString(category ?? [])
      ? { category: getParamsFromString(category ?? []) }
      : {};

    const includes = { ...statusItem, ...tagsDivided, ...categoryDivided };
    const result = await Furniture.find(
      includes,
      "-createdAt -updatedAt -size -colors -reviews -rating -general -product -dimensions -warranty",
      {
        skip,
        limit: Number(limit),
        sort: sortByPrice,
      }
    ).exec();

    const summary = await this.count(includes);
    return {
      summary,
      result,
    };
  }

  async create(body: IFurnitureSchema) {
    return await Furniture.create(body);
  }

  async getOne(id: string) {
    return await Furniture.findById(id).exec();
  }

  async getDistinct(param: string) {
    return await Furniture.distinct(param).exec();
  }

  async updateById(id: string, body: Partial<IFurnitureSchema>) {
    return await Furniture.findByIdAndUpdate(id, body, {
      new: true,
    }).exec();
  }

  async deleteOne(id: string) {
    return await Furniture.findByIdAndDelete(id).exec();
  }

  async count(data: { [x: string]: unknown }) {
    return await Furniture.countDocuments(data).exec();
  }
}
