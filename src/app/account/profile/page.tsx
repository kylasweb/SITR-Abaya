'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { logoutAction } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getOrdersByUserId } from '@/lib/data';
import type { Order } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

function OrderHistoryItem({ order }: { order: Order }) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: order.currency,
        }).format(price);
    };

    return (
        <li className="p-4 border rounded-lg">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <p className="font-semibold">Order ID</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
                 <Badge variant={order.status === 'pending' ? 'secondary' : 'default'} className="capitalize">{order.status}</Badge>
            </div>
            <Separator className="my-3" />
            <div className="text-sm space-y-1">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-semibold">{formatPrice(order.total)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">View Details</Button>
        </li>
    )
}


export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { clearCart } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Handle post-order success toast
  useEffect(() => {
    if (searchParams.get('order_success') === 'true') {
        toast({
            title: "Order Placed Successfully!",
            description: "Thank you for your purchase. You can view it in your order history.",
        });
        clearCart();
        // Use replace to remove the query param from the URL without adding to history
        router.replace('/account/profile', {scroll: false}); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fetch orders when user is available
  useEffect(() => {
    async function fetchOrders() {
      if (user) {
        setLoadingOrders(true);
        try {
          const userOrders = await getOrdersByUserId(user.uid);
          setOrders(userOrders);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch your order history.",
          });
        } finally {
          setLoadingOrders(false);
        }
      }
    }
    fetchOrders();
  }, [user, toast]);

  // Redirect to login if not authenticated and not loading
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);


  if (authLoading || !user) {
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
                         <ul className="space-y-4">
                            {[...Array(2)].map((_, i) => (
                                <li key={i} className="p-4 border rounded-lg space-y-3">
                                <Skeleton className="h-5 w-1/3" />
                                <Skeleton className="h-3 w-1/2" />
                                <Separator className="my-3" />
                                <Skeleton className="h-8 w-full" />
                                </li>
                            ))}
                        </ul>
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
              {loadingOrders ? (
                <ul className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <li key={i} className="p-4 border rounded-lg space-y-3">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                      <Separator className="my-3" />
                      <Skeleton className="h-8 w-full" />
                    </li>
                  ))}
                </ul>
              ) : orders.length > 0 ? (
                <ul className="space-y-4">
                  {orders.map(order => (
                    <OrderHistoryItem key={order.id} order={order} />
                  ))}
                </ul>
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
