'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Device } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ShieldX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function DevicesPage() {
  const { toast } = useToast();
  const { data: devices, refetch } = useQuery<Device[]>({
    queryKey: ['devices-list'],
    queryFn: async () => (await api.get('/devices')).data
  });

  const revokeConsent = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin mencabut persetujuan perangkat ini? Perangkat harus ditautkan ulang dengan QR Code nantinya.')) {
      try {
        await api.delete(`/devices/${id}/consent`);
        toast({ title: 'Akses Dicabut', description: 'Persetujuan perangkat berhasil dihentikan.' });
        refetch();
      } catch (err: any) {
        toast({ variant: 'destructive', title: 'Gagal', description: err.message });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Persetujuan Perangkat</h1>
          <p className="text-muted-foreground">Daftar gawai anak yang secara sukarela berbagi data monitoring.</p>
        </div>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Perangkat</TableHead>
              <TableHead>Model & OS</TableHead>
              <TableHead>Status Izin</TableHead>
              <TableHead>Baterai</TableHead>
              <TableHead>Sinkronisasi Terakhir</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices?.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">{device.name}</TableCell>
                <TableCell>{device.model} (Android {device.osVersion})</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Aktif & Transparan
                  </Badge>
                </TableCell>
                <TableCell>{device.batteryLevel}%</TableCell>
                <TableCell>{new Date(device.lastSeen).toLocaleString('id-ID')}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> Detail
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => revokeConsent(device.id)}>
                    <ShieldX className="h-4 w-4 mr-1" /> Cabut Akses
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
        }
