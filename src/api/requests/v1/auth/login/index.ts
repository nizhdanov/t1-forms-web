import type { User } from '@/api';

import { api } from '@/api/instance';

export const login = ({ options, dto }: RequestParams<{ dto: { email: string, password: string } }>) => api<User>('auth/login', {
  ...options,
  method: 'POST',
  body: dto
});
