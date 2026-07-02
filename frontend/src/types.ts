export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ExpenseItem {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface MonthlyExpense {
  month: number;
  total: number;
}

export interface CategoryExpense {
  category: string;
  total: number;
}

export interface JwtPayload {
  sub?: string;
  email?: string;
  name?: string;
  role?: string;
  userId?: number;
  exp?: number;
}