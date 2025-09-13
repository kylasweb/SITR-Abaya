'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { logoutAction } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { getOrdersByUserId } from '@/lib/data';
import type { Order } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Redirect to login if not authenticated and not loading
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        setOrdersLoading(true);
        const userOrders = await getOrdersByUserId(user.uid);
        setOrders(userOrders);
        setOrdersLoading(false);
      };
      fetchOrders();
    }
  }, [user]);


  if (loading || !user) {
    // Show a global loading state while checking auth
    return (
       <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-4 w-3/4 mt-4" />
        </header>
         <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                 <Card>
                    <CardHeader className="items-center text-center">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <Skeleton className="h-6 w-32 mt-4" />
                        <Skeleton className="h-4 w-40 mt-2" />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <Skeleton className="h-6 w-1/2 mx-auto" />
                            <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
                            <Skeleton className="h-10 w-32 mx-auto mt-4" />
                        </div>
                    </CardContent>
                </Card>
            </div>
         </div>
      </div>
    );
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  const formatPrice = (price: number, currencyCode: string) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
    }).format(price);
  };


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">My Account</h1>
        <p className="mt-2 text-muted-foreground">Manage your information and view your order history.</p>
      </header>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 text-3xl">
                <AvatarFallback>{getInitials(user?.displayName || user?.email)}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline mt-4">{user?.displayName || 'User'}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" disabled>Edit Profile</Button>
              <form action={logoutAction}>
                <Button variant="ghost" className="w-full">Log Out</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order History</CardTitle>
              <CardDescription>A list of your past and current orders.</CardDescription>
            </CardHeader>
            <CardContent>
                {ordersLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                    ))}
                  </div>
                ) : orders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium text-xs text-muted-foreground">{order.id.slice(0, 7)}...</TableCell>
                          <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === 'pending' ? 'secondary' : 'default'} className="capitalize">{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{formatPrice(order.total, order.currency)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <h3 className="text-lg font-semibold">No Orders Yet</h3>
                    <p className="mt-1 text-muted-foreground">You haven't placed any orders with us yet.</p>
                    <Button asChild className="mt-4" variant="secondary">
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
