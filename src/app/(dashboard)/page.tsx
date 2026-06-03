'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Device } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Activity, Wifi, WifiOff } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const { data: devices, isLoading } = useQuery<Device[]>({
    queryKey: ['devices-summary'],
    queryFn: async () => (await api.get('/devices')).data,
    refetchInterval: 30000 // Polling setiap 30 detik sebagai fallback socket
  });

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Devices" value={devices?.length || 0} icon={<Activity />} />
        <StatCard 
          title="Online Now" 
          value={devices?.filter(d => d.isOnline).length || 0} 
          icon={<Wifi className="text-green-500" />} 
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8">Live Status Perangkat</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {devices?.map((device) => (
          <Card key={device.id} className="relative overflow-hidden">
            <div className={cn(
              "absolute top-0 left-0 w-1 h-full",
              device.isOnline ? "bg-green-500" : "bg-red-500"
            )} />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{device.name}</CardTitle>
                {device.isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-muted-foreground" />}
              </div>
              <p className="text-xs text-muted-foreground">{device.model} • v{device.osVersion}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Battery className={cn("h-4 w-4", device.batteryLevel < 20 ? "text-red-500" : "text-primary")} />
                    <span>Baterai</span>
                  </div>
                  <span className="font-medium">{device.batteryLevel}%</span>
                </div>
                <Progress value={device.batteryLevel} className="h-2" />
                <div className="text-[10px] text-right text-muted-foreground">
                  Update: {new Date(device.lastSeen).toLocaleTimeString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
