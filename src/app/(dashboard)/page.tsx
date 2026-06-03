'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import DeviceCard from '@/components/dashboard/device-card';
import { useDeviceStore } from '@/store/use-device-store';
import { useEffect } from 'react';
import { Device } from '@/types';

export default function DashboardPage() {
  const { devices, setDevices } = useDeviceStore();

  const { data, isLoading } = useQuery<Device[]>({
    queryKey: ['devices'],
    queryFn: async () => {
      const res = await api.get('/devices');
      return res.data;
    },
  });

  useEffect(() => {
    if (data) setDevices(data);
  }, [data, setDevices]);

  if (isLoading) return <div>Memuat data perangkat keluarga...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ringkasan Keluarga</h1>
        <p className="text-muted-foreground">Monitor status dan persetujuan perangkat anak secara real-time.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
}
