'use client';

import { ColumnDef } from '@tanstack/react-table';
import { NotificationRecord } from '@/types/dashboard-extended';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const getColumns = (onViewDetail: (row: NotificationRecord) => void): ColumnDef<NotificationRecord>[] => [
  {
    accessorKey: 'id',
    header: 'Notification ID',
    cell: ({ row }) => <span className="font-mono text-xs">{row.getValue('id')}</span>,
  },
  {
    accessorKey: 'deviceName',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Device Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'childName',
    header: 'Child Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <Badge variant="outline" className="capitalize">{row.getValue('type')}</Badge>,
  },
  {
    accessorKey: 'severity',
    header: 'Severity',
    cell: ({ row }) => {
      const severity = row.getValue('severity') as string;
      const variants: Record<string, string> = {
        low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
        critical: 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse',
      };
      return <Badge className={`capitalize border ${variants[severity] || ''}`}>{severity}</Badge>;
    },
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => <span className="truncate max-w-[200px] block">{row.getValue('message')}</span>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <span>{new Date(row.getValue('createdAt')).toLocaleString('id-ID')}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') === 'read';
      return (
        <div className="flex items-center gap-1.5">
          {status ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
          <span className="text-xs capitalize">{row.getValue('status')}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button variant="ghost" size="sm" onClick={() => onViewDetail(row.original)}>
        <Eye className="h-4 w-4 mr-1" /> Detail
      </Button>
    ),
  },
];
