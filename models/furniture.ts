import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../helpers/handleMongooseError";

interface IGoodData {
  title: string;
  value: string;
}

interface IRating {
  user: string;
  id: string;
  mark: number;
}

interface IReview {
  id?: string;
  author?: string;
  name: string;
  review: string;
  date?: string;
}

interface IFurnitureShema {
  title: string;
  description: string;
  price: string;
  tags?: string[];
  discount: string;
  status: string;
  amount: number;
  size?: string[];
  pictures?: string[];
  colors?: string[];
  reviews?: IReview[];
  rating?: IRating[];
  general?: IGoodData[];
  product?: IGoodData[];
  dimensions?: IGoodData[];
  warranty?: object;
  category: string;
}

const furnitureSchema = new Schema<IFurnitureShema>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  discount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "new",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  size: {
    type: [String],
    required: false,
  },
  pictures: {
    type: [String],
  },
  colors: {
    type: [String],
  },
  reviews: {
    type: [],
  },
  rating: {
    type: [],
  },
  general: {
    type: [],
  },
  product: {
    type: [],
  },
  dimensions: {
    type: [],
  },
  warranty: {
    type: Object,
  },
  category: {
    type: String,
    required: true,
  },
});

furnitureSchema.post("save", (mongo) =>
  handleMongooseError({ data: 0, error: undefined, next: undefined, ...mongo })
);

export const addSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  discount: Joi.string().required(),
  status: Joi.string().required(),
  amount: Joi.number().required(),
  size: Joi.array().items(Joi.string()),
  pictures: Joi.array().items(Joi.string()),
  colors: Joi.array().items(Joi.string()),
  reviews: Joi.array().items(Joi.object()),
  rating: Joi.array().items(
    Joi.object({ user: Joi.string(), id: Joi.string(), mark: Joi.number() })
  ),
  general: Joi.array().items(
    Joi.object({ title: Joi.string(), value: Joi.string() })
  ),
  product: Joi.array().items(
    Joi.object({ title: Joi.string(), value: Joi.string() })
  ),
  dimensions: Joi.array().items(
    Joi.object({ title: Joi.string(), value: Joi.string() })
  ),
  warranty: Joi.object(),
  category: Joi.string().required(),
});

export const addRating = Joi.object({
  user: Joi.string().required(),
  id: Joi.string(),
  mark: Joi.number().min(0).max(5),
});

export const addReview = Joi.object({
  id: Joi.string(),
  author: Joi.string(),
  name: Joi.string().required(),
  review: Joi.string().required(),
  date: Joi.date(),
});

const Furniture = model("Furniture", furnitureSchema);

export default Furniture;
