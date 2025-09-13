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
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { clearCart } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();


  // Handle post-order success
  useEffect(() => {
    if (searchParams.get('order_success') === 'true') {
        toast({
            title: "Order Placed Successfully!",
            description: "Thank you for your purchase. A confirmation has been simulated.",
        });
        clearCart();
        // Clean up the URL
        router.replace('/account/profile');
    }
  }, [searchParams, clearCart, toast, router]);


  // Redirect to login if not authenticated and not loading
  if (!loading && !user) {
    router.push('/login');
    return null; // Return null to prevent rendering anything while redirecting
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  if (loading) {
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
                       <Skeleton className="h-24 w-24 rounded-full" />
                       <Skeleton className="h-6 w-40 mt-4" />
                       <Skeleton className="h-4 w-48 mt-2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full mt-2" />
                    </CardContent>
                </Card>
            </div>
             <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Order History</CardTitle>
                        <CardDescription>Your recent orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                           <Skeleton className="h-6 w-32 mx-auto" />
                           <Skeleton className="h-4 w-48 mx-auto mt-2" />
                           <Skeleton className="h-10 w-32 mx-auto mt-4" />
                        </div>
                    </CardContent>
                </Card>
             </div>
        </div>
      </div>
    );
  }

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
              <Button variant="outline" className="w-full">Edit Profile</Button>
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
              <CardDescription>Your recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="text-center py-10 border-2 border-dashed rounded-lg">
                <h3 className="text-lg font-semibold">No Orders Yet</h3>
                <p className="mt-1 text-muted-foreground">You haven't placed any orders with us yet.</p>
                <Button asChild className="mt-4" variant="secondary">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
