import { api } from '@/lib/api';
import type { ApiResponse, Category } from '@/types';

export async function getCategories() {
  const response = await api.get<ApiResponse<Category[]>>('/api/categories');
  return response.data.data;
}

export async function createCategory(name: string) {
  const response = await api.post<ApiResponse<string>>('/api/categories', null, {
    params: { name },
  });
  return response.data.message;
}

export async function deleteCategory(id: number) {
  const response = await api.delete<ApiResponse<string>>(`/api/categories/${id}`);
  return response.data.message;
}