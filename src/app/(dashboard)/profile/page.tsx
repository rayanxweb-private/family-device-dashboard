'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import { updateProfile, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, []);

  const handleUpdate = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
        toast({ title: 'Profil Diperbarui', description: 'Data nama penanggung jawab berhasil disimpan.' });
      }
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Gagal Memperbarui', description: err.message });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan Profil Keluarga</h1>
        <p className="text-muted-foreground">Atur identitas administrator utama pemantau dashboard.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun Utama</CardTitle>
          <CardDescription>Akun ini bertindak sebagai Admin Hub.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="relative h-16 w-16 rounded-full overflow-hidden bg-accent">
              <Image 
                src={auth.currentUser?.photoURL || "https://api.dicebear.com/7.x/bottts/svg?seed=family"} 
                alt="Avatar" 
                fill 
              />
            </div>
            <div>
              <h3 className="font-medium">{name || 'Administrator'}</h3>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nama Penanggung Jawab</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Terdaftar</label>
            <Input value={email} disabled className="bg-accent text-muted-foreground" />
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleUpdate}>Simpan Perubahan</Button>
            <Button variant="outline" onClick={handleLogout} className="text-destructive border-destructive/20 hover:bg-destructive/10">
              Keluar dari Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
