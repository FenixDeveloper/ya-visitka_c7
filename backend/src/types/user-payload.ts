export interface IUserPayload {
  _id: any;
  email: string;
  role: string;
  name?: string;
  photo?: string;
  cohort?: string;
}

export interface IUserProfileYandex {
  email: string;
  name: string;
}
