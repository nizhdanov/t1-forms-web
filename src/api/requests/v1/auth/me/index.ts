import type { User } from '@/api';

import { api } from '@/api/instance';

export const getProfile = (params?: RequestParams) => api<User>('auth/me', {
  ...params?.options,
  method: 'GET'
});
