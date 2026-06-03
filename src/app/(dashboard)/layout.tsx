'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/shared/sidebar';
import Navbar from '@/components/shared/navbar';
import LoadingSkeleton from '@/components/shared/loading-skeleton';
import { useSocket } from '@/hooks/use-socket';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useSocket(); // Mengaktifkan koneksi global socket backend

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Navbar />
        <main className="p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
