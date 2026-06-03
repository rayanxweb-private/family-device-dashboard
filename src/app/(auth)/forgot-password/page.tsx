'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'link';

const forgotSchema = z.object({
  email: z.string().email('Format email tidak valid'),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: z.infer<typeof forgotSchema>) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({ title: 'Email Terkirim', description: 'Periksa tautan reset password di kotak masuk email Anda.' });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Gagal', description: error.message });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Kami akan mengirimkan link untuk memulihkan akses akun Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input type="email" placeholder="Masukkan Email Anda" {...register('email')} />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Kirim Link Reset'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <Link href="/login" className="text-primary underline">Kembali ke Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
