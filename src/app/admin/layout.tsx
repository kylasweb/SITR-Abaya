import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './admin-layout-client';

const ADMIN_COOKIE_NAME = 'sitr-admin-auth';

// This is a server component that handles authentication
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  // This check runs on the server before rendering the page
  if (authCookie?.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login');
  }

  // If authenticated, we render the client-side layout component
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
