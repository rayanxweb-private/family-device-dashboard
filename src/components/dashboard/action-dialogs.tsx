'use client';

import { useState } from 'react';
import { useSocket } from '@/hooks/use-socket';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function ActionDialogs({ deviceId }: { deviceId: string }) {
  const { emitAction } = useSocket();
  const { toast } = useToast();
  const [message, setMessage] = useState('');

  const sendCustomNotification = () => {
    if (!message) return;
    emitAction('action:notification', { deviceId, message });
    toast({ title: 'Perintah Dikirim', description: 'Notifikasi kustom sedang dikirim ke perangkat tujuan.' });
    setMessage('');
  };

  const triggerConsentAlarm = () => {
    emitAction('action:alarm', { deviceId });
    toast({ title: 'Minta Akses Alarm', description: 'Permintaan membunyikan alarm dikirim (Berbasis Persetujuan).' });
  };

  return (
    <div className="grid grid-cols-2 gap-2 pt-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">Kirim Pesan</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kirim Catatan Keluarga</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Input 
              placeholder="Tulis pesan pengingat keamanan..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
            />
            <Button onClick={sendCustomNotification} className="w-full">Kirim Sekarang</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Button variant="destructive" size="sm" onClick={triggerConsentAlarm}>
        Bunyikan Alarm
      </Button>
    </div>
  );
}
