import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './admin-layout-client';

const ADMIN_COOKIE_NAME = 'sitr-admin-auth';

// This is a server component that handles authentication
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  
  const headersList = await headers();
  const pathname = headersList.get('x-next-pathname') || '';

  // The login page should be accessible without being authenticated.
  // We check the cookie for all other admin routes.
  if (pathname !== '/admin/login' && authCookie?.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login');
  }
  
  // If user is authenticated but tries to access login page, redirect to dashboard.
  if (pathname === '/admin/login' && authCookie?.value === process.env.ADMIN_PASSWORD) {
    redirect('/admin');
  }

  // If authenticated, we render the client-side layout component
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
