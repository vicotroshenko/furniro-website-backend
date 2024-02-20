import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../helpers/handleMongooseError";

interface ICart {
	_id: string;
	title: string;
	price: string;
	amount: number;
	pictures: string[];
	discount: string;
  buyAmount?: number;
  date?: string;
}

interface IOrderShema {
	orderNumber?: string;
	firstName: string,
	lastName: string,
	company?: string,
	country: string,
	region: string,
	city: string,
	zip?: string,
	phone: string,
	email: string,
	additional?: string,
	orderType: string,
	totalPrice: string;
	order: ICart[];
	createdAt?: string;
}

const orderSchema = new Schema<IOrderShema>({
	orderNumber: {
		type: String,
		default: "",
	},
	firstName: {
    type: String,
    required: true,
  },
	lastName: {
    type: String,
    required: true,
  },
	company: {
    type: String,
		default: "",
  },
	country: {
    type: String,
    required: true,
  },
	region: {
    type: String,
    required: true,
  },
	city: {
    type: String,
    required: true,
  },
	zip: {
    type: String,
		default: "",
  },
	phone: {
    type: String,
    required: true,
  },
	email: {
    type: String,
    required: true,
  },
	additional: {
    type: String,
		default: "",
  },
	orderType: {
    type: String,
    required: true,
  },
	totalPrice: {
		type: String,
		required: true,
	},
	order:{
		type: [Object],
		required: true,
	},
	createdAt:{
		type: String,
		default: "",
	}
});

orderSchema.post("save", (mongo) =>
  handleMongooseError({ data: 0, error: undefined, next: undefined, ...mongo })
);

export const addOrderSchema = Joi.object({
	orderNumber: Joi.string().empty(''),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	company: Joi.string().empty(''),
	country: Joi.string().required(),
	region: Joi.string().required(),
	city: Joi.string().required(),
	zip: Joi.string().empty(''),
	phone: Joi.string().required(),
	email: Joi.string().required(),
	additional: Joi.string().empty(''),
	orderType: Joi.string().required(),
	totalPrice: Joi.string().required(),
	order: Joi.array().items(Joi.object({
		_id: Joi.string().required(),
		title: Joi.string().required(),
		price: Joi.string().required(),
		amount: Joi.number().required(),
		pictures: Joi.array().required(),
		discount: Joi.string().required(),
		buyAmount: Joi.number().required(),
		date: Joi.string().required(),
	})),
	createdAt: Joi.string().empty('')
});


const Order = model("Order", orderSchema);

export default Order;