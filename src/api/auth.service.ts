import { getSession, signOut } from 'next-auth/react';
import { axiosInstance as axios } from './axios.config';
import Snackbar from 'utils/Snackbar'

const endpoint = '/auth';

export const AuthService = {
  register: async ({ email, name, password, phone }: IRegisterRequest) => {
    try {
      const response = await axios.post<IRegisterResponse>(`${endpoint}/register`, {
        email,
        name,
        password,
        phone,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async ({ password, name }: ILoginRequest) => {
    try {
      const response = await axios.post<ILoginResponse>(`${endpoint}/login`, {
        password,
        name,
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      signOut();
    } catch (error) {
      throw error;
    }
  },
  updateMe: async (data: IUser) => {
    try {
      const response = await axios.patch(`${endpoint}/me`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMe: async () => {
    const session = await getSession();
    try {
      const response = await axios.get<IUser>(`${endpoint}/me`);
      session.user = {
        ...response.data,
        accessToken: session?.user?.accessToken,
        refreshToken: session?.user?.refreshToken,
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  refresh: async () => {
    const session = await getSession();
    try {
      const response = await axios.post<ITokens>(`${endpoint}/refresh`, {
        refreshToken: session?.user?.refreshToken,
      }, {
        headers: {
          'Authorization': ''
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
