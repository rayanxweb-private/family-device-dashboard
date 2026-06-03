import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Family Device Safety Dashboard',
  description: 'Transparent and consent-based family monitoring dashboard.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
