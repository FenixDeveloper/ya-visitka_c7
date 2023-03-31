export interface IProfile {
  profile: {
    name: string;
    photo: string;
    city: {
      name: string;
      geocode: Array<number>;
    };
    birthday: string;
    quote: string;
    telegram: string;
    github: string;
    template: string;
  };
  info: {
    hobby: {
      text: string;
      image: null;
    };
    status: {
      text: string;
      image: null;
    };
    job: {
      text: string;
      image: null;
    };
    edu: {
      text: string;
      image: null;
    };
  };
}
