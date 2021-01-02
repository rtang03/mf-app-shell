import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
  UpdateProfileResponse,
  User,
} from '../types';

export const isRegisterResponse = (input: {
  id: string;
  username: string;
}): input is RegisterResponse => input?.id !== undefined && input?.username !== undefined;

export const isLoginResponse = (input: {
  id: string;
  username: string;
  access_token: string;
  token_type: string;
}): input is LoginResponse =>
  input?.id !== undefined &&
  input?.username !== undefined &&
  input?.access_token !== undefined &&
  input?.token_type !== undefined;

export const isUser = (input: { id: string; username: string }): input is User =>
  input?.id !== undefined && input?.username !== undefined;

export const isRefreshTokenResponse = (input: {
  token_type: string;
  refresh_token: string;
  access_token: string;
}): input is RefreshTokenResponse =>
  input?.token_type !== undefined &&
  input?.refresh_token !== undefined &&
  input?.access_token !== undefined;

export const isUpdateProfileResponse = (input: {
  ok: boolean;
  username: string;
  email: string;
}): input is UpdateProfileResponse =>
  input?.ok !== undefined && input?.username !== undefined && input?.email !== undefined;
