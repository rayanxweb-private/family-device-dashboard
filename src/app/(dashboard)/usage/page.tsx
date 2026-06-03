'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { AppUsage } from '@/types';
import { UsageChart } from '@/components/dashboard/usage-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UsagePage() {
  const { data: usageLogs } = useQuery<AppUsage[]>({
    queryKey: ['app-usage'],
    queryFn: async () => (await api.get('/usage')).data
  });

  // Transformasi data untuk Recharts graph
  const chartData = usageLogs?.reduce((acc: any[], current) => {
    const existing = acc.find(item => item.name === current.appName);
    if (existing) {
      existing.total += current.durationMinutes;
    } else {
      acc.push({ name: current.appName, total: current.durationMinutes });
    }
    return acc;
  }, []) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Aktivitas Aplikasi Sukarela</h1>
        <p className="text-muted-foreground">Statistik durasi aplikasi yang dibagikan secara transparan oleh perangkat anak.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Grafik Durasi Penggunaan (Menit)</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageChart data={chartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[350px] overflow-y-auto">
            {usageLogs?.map((log) => (
              <div key={log.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                <div>
                  <p className="font-medium text-sm">{log.appName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString('id-ID')}
                  </p>
                </div>
                <span className="text-sm font-semibold text-primary">{log.durationMinutes} mnt</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
