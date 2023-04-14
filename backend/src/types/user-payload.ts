export interface IUserPayload {
  _id: any;
  email: string;
  role: string;
  name?: string;
  cohort?: string;
}

export interface IUserProfileYandex {
  email: string;
  name: string;
}
