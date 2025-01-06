export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}
export interface IApiError {
  status: number;
  data: {
    message: string;
    [key: string]: unknown;
  };
}

export interface IUnit {
  _id: string;
  name: string;
  createdAt: string;
}
export interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
}
export interface IProduct {
  _id: string;
  name: string;
  purchasePrice: number;
  salePrice: number;
  quantity: number;
  stock: string;
  unit: IUnit;
  category: ICategory;
  createdAt: string;
}
export interface ISale {
  _id: string;
  customerName: string;
  customerPhone: string;
  products: {
    product: string;
    quantity: number;
    unit: string;
    salePrice: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  saleDate: string;
  createdBy: string;
  createdAt: string;
}
