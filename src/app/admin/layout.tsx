import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Bot,
  User,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAction } from './login/actions';

const ADMIN_COOKIE_NAME = 'sitr-admin-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  if (authCookie?.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login');
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-auto" />
            <span className="font-headline text-2xl group-data-[collapsible=icon]:hidden">
              SITR Admin
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <ShoppingCart />
                  <span>Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/products">
                  <Package />
                  <span>Products</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Users />
                  <span>Customers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/generate-description">
                  <Bot />
                  <span>Generate Content</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <form action={logoutAction} className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              <LogOut />
              <span>Log Out</span>
            </Button>
          </form>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between border-b px-4 md:justify-end">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-2">
             <Avatar className="h-8 w-8">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
