'use client';

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
  LogOut,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { logoutAction } from './login/actions';
import { usePathname } from 'next/navigation';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The login page does not have the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader>
          <div className="flex items-center gap-2.5">
            <div className="bg-primary text-primary-foreground h-8 w-8 flex items-center justify-center rounded-md">
              <Logo className="h-5 w-5" />
            </div>
            <span className="font-headline text-xl group-data-[collapsible=icon]:hidden">
              SITR Admin
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/admin'} tooltip="Dashboard">
                <Link href="/admin">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/orders')} tooltip="Orders">
                <Link href="/admin/orders">
                  <ShoppingCart />
                  <span>Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/products')} tooltip="Products">
                <Link href="/admin/products">
                  <Package />
                  <span>Products</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/customers')} tooltip="Customers">
                <Link href="/admin/customers">
                  <Users />
                  <span>Customers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/ai-content-studio')} tooltip="AI Content Studio">
                <Link href="/admin/ai-content-studio">
                  <Bot />
                  <span>AI Content Studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/settings')} tooltip="Settings">
                <Link href="/admin/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <form action={logoutAction} className="w-full">
             <SidebarMenuButton asChild variant="ghost" tooltip="Log Out">
                <button type="submit" className="w-full">
                  <LogOut />
                  <span>Log Out</span>
                </button>
            </SidebarMenuButton>
          </form>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-gray-100 dark:bg-gray-900">
        <header className="flex h-14 items-center justify-between border-b bg-white dark:bg-gray-800 px-4 md:justify-end">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-3">
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
