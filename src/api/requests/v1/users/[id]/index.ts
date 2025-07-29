import type { User } from '@/api';

import { api } from '@/api/instance';

export const getUserById = ({ id, options }: RequestParams<{ id: string }>) => api<User>(`users/${id}`, {
  ...options,
  method: 'GET'
});

export const updateUser = ({ id, dto, options }: RequestParams<{ id: string, dto: {} }>) => api<User>(`users/${id}`, {
  ...options,
  method: 'PATCH',
  body: dto
});

export const deleteUser = ({ id, options }: RequestParams<{ id: string }>) => api<User>(`users/${id}`, {
  ...options,
  method: 'DELETE'
});
