export interface IGoodData {
  title: string;
  value: string;
}

export interface IRating {
  user: string;
  id: string;
  mark: number;
  author?: string;
}

export interface IReview {
  id?: string;
  author?: string;
  name: string;
  review: string;
  date?: string;
}

export interface IFurnitureSchema {
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
