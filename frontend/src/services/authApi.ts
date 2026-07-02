import { api } from '@/lib/api';
import type { ApiResponse, ChangePasswordRequest, LoginRequest, RegisterRequest } from '@/types';

export async function login(request: LoginRequest) {
  const response = await api.post<ApiResponse<string>>('/api/auth/login', request);
  return response.data.data;
}

export async function register(request: RegisterRequest) {
  const response = await api.post<ApiResponse<string>>('/api/auth/register', request);
  return response.data.message;
}

export async function changePassword(request: ChangePasswordRequest) {
  const response = await api.post<ApiResponse<string>>('/api/auth/change-password', request);
  return response.data.message;
}