'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard Error Boundary:', error);
  }, [error]);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center p-4 text-center bg-background">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-semibold tracking-tight mb-2">Terjadi Kesalahan Sistem</h2>
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        Gagal memuat data dashboard real-time secara aman. Silakan coba segarkan halaman atau hubungi admin.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Coba Lagi
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Segarkan Halaman
        </Button>
      </div>
    </div>
  );
            }
