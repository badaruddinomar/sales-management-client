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
