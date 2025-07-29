import type { User } from '@/api';

import { api } from '@/api/instance';

export const getAllUsers = (params?: RequestParams) => api<User[]>('users', {
  ...params?.options,
  method: 'GET'
});

export const createUser = ({ options, dto }: RequestParams<{ dto: {} }>) => api<User>('users', {
  ...options,
  method: 'POST',
  body: dto
});
