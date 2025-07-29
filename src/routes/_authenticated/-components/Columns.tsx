import type { ColumnDef } from '@tanstack/react-table';

export interface User {
  amount: number
  email: string
  id: string
  status: 'failed' | 'pending' | 'processing' | 'success'
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  }
];
