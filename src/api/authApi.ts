import apiClient from './client';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export const login = (payload: LoginRequest) =>
  apiClient
    .post<LoginResponse>('/auth/login', payload)
    .then(response => response.data);
