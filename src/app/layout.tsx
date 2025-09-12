import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { StoreProvider } from '@/lib/store';
import { AuthProvider } from '@/lib/auth';
import { headers } from 'next/headers';


export const metadata: Metadata = {
  title: 'SITR - Elegance Redefined',
  description: 'Luxury abayas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col', { 'bg-muted/50': isAdminRoute && pathname !== '/admin/login' })}>
        <AuthProvider>
          <StoreProvider>
            {!isAdminRoute && <Header />}
            <main className="flex-grow">{children}</main>
            {!isAdminRoute && <Footer />}
            <Toaster />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
