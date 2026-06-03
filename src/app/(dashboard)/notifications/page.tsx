'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { NotificationRecord } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/trigger';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Bell, Info } from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<string>('all');

  const { data: notifications } = useQuery<NotificationRecord[]>({
    queryKey: ['notifications-history'],
    queryFn: async () => (await api.get('/notifications')).data
  });

  const filteredNotifications = notifications?.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Riwayat Notifikasi Keamanan</h1>
          <p className="text-muted-foreground">Pemberitahuan sistem dari aplikasi klien terdaftar.</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Notifikasi</SelectItem>
            <SelectItem value="alert">Peringatan Kritis</SelectItem>
            <SelectItem value="system">Sistem</SelectItem>
            <SelectItem value="message">Pesan Keluarga</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredNotifications?.map((notif) => (
          <Card key={notif.id} className="bg-card">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="mt-1">
                {notif.type === 'alert' && <AlertTriangle className="h-5 w-5 text-destructive" />}
                {notif.type === 'system' && <Info className="h-5 w-5 text-blue-500" />}
                {notif.type === 'message' && <Bell className="h-5 w-5 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">{notif.title}</h3>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(notif.createdAt).toLocaleString('id-ID')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{notif.body}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
