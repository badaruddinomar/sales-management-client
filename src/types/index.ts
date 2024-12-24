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
