import { api } from '@/lib/api';
import type { ApiResponse, CategoryExpense, MonthlyExpense } from '@/types';

export async function getMonthlyAnalytics() {
  const response = await api.get<ApiResponse<MonthlyExpense[]>>('/api/analytics/monthly');
  return response.data.data;
}

export async function getCategoryAnalytics() {
  const response = await api.get<ApiResponse<CategoryExpense[]>>('/api/analytics/category');
  return response.data.data;
}