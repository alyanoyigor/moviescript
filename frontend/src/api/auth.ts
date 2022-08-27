import { Login, Register, User } from '../types';
import client from './client';

export const login = async (data: Login) => {
  try {
    return await client.post<never, { token: string }>('/auth/login', data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (data: Register) => {
  try {
    return await client.post<never, { token: string }>('/auth/register', data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async () => {
  try {
    return await client.get<never, { user: User }>('/auth/logout');
  } catch (error) {
    return Promise.reject(error);
  }
};
