import { TOKEN_STORAGE_KEY } from '@/config';
import type { JwtPayload } from '@/types';

export function getToken() {
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    const json = window.atob(padded);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenEmail(token: string | null) {
  if (!token) {
    return null;
  }

  const payload = decodeToken(token);
  return payload?.sub ?? payload?.email ?? null;
}

export function getTokenDisplayName(token: string | null) {
  if (!token) {
    return null;
  }

  const payload = decodeToken(token);
  return payload?.name ?? payload?.sub ?? payload?.email ?? null;
}

export function isTokenExpired(token: string) {
  const payload = decodeToken(token);
  if (!payload?.exp) {
    return false;
  }

  return Date.now() >= payload.exp * 1000;
}