import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'api/auth.service';

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, name, password, phone }: IRegisterRequest) => {
    try {
      const response = await AuthService.register({ email, name, password, phone });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
);

export const login = createAsyncThunk('auth/login', async ({ name, password }: ILoginRequest) => {
  try {
    const response = await AuthService.login({ name, password });
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await AuthService.logout();
  } catch (error) {
    throw new Error(error);
  }
});

export const getMe = createAsyncThunk('auth/profile', async () => {
  try {
    const response = await AuthService.getMe();
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const updateMe = createAsyncThunk('auth/profile/update', async (data: any) => {
  try {
    const response = await AuthService.updateMe(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});
