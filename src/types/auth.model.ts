interface ILoginRequest {
  name: string;
  password: string;
}

interface ILoginResponse extends ITokens {
  user: IUser;
}

interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface IRegisterResponse {
  data: string;
}

interface ISession extends IUser, ITokens{}

interface ITokens{
  accessToken: string;
  refreshToken?: string;
};
