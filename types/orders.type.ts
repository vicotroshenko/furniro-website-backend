export interface ICart {
  _id: string;
  title: string;
  price: string;
  amount: number;
  pictures: string[];
  discount: string;
  buyAmount?: number;
  date?: string;
}

export interface IOrderSchema {
  orderNumber?: string;
  firstName: string;
  lastName: string;
  company?: string;
  country: string;
  region: string;
  city: string;
  zip?: string;
  phone: string;
  email: string;
  additional?: string;
  orderType: string;
  totalPrice: string;
  order: ICart[];
  createdAt?: string;
}
