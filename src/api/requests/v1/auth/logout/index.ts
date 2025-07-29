import type { User } from '@/api';

import { api } from '@/api/instance';

export const logout = ({ options }: RequestParams) => api<User>('auth/logout', {
  ...options,
  method: 'POST'
});
