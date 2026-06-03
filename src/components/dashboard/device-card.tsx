'use client';

import { Device } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Battery, ShieldCheck } from 'lucide-react';
import ActionDialogs from './action-dialogs';

export default function DeviceCard({ device }: { device: Device }) {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
        <Badge variant={device.isOnline ? 'default' : 'secondary'}>
          {device.isOnline ? 'Online' : 'Offline'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Battery className="h-4 w-4" /> {device.batteryLevel}%
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4" /> v{device.appVersion}
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground">
          Sinkronisasi Terakhir: {new Date(device.lastSeen).toLocaleString('id-ID')}
        </div>
        <ActionDialogs deviceId={device.id} />
      </CardContent>
    </Card>
  );
}
