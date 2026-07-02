import { api } from '@/lib/api';
import type { ApiResponse, ExpenseItem } from '@/types';

export async function getExpenses() {
  const response = await api.get<ApiResponse<ExpenseItem[]>>('/api/expenses');
  return response.data.data;
}

export async function createExpense(request: { title: string; amount: number; categoryId: number }) {
  const response = await api.post<ApiResponse<string>>('/api/expenses', null, {
    params: request,
  });
  return response.data.message;
}

export async function updateExpense(request: { id: number; title: string; amount: number }) {
  const response = await api.put<ApiResponse<string>>(`/api/expenses/${request.id}`, null, {
    params: { title: request.title, amount: request.amount },
  });
  return response.data.message;
}

export async function deleteExpense(id: number) {
  const response = await api.delete<ApiResponse<string>>(`/api/expenses/${id}`);
  return response.data.message;
}