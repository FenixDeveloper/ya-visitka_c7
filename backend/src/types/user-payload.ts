export interface IUserPayload {
  _id: any;
  email: string;
  role: string;
}

export interface IUserProfileYandex {
  email: string;
  name: string;
}

export interface IUser {
  role?: string;
}
