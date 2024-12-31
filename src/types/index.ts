import { IconType } from "react-icons/lib";

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

export interface IStats {
  title: string;
  value: number;
  icon: IconType;
  percentage: number;
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
