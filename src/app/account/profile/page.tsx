import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">My Account</h1>
        <p className="mt-2 text-muted-foreground">Manage your information and view your order history.</p>
      </header>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">User Profile</CardTitle>
              <CardDescription>Jane Doe</CardDescription>
              <CardDescription>jane.doe@example.com</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Edit Profile</Button>
              <Button variant="link" asChild className="w-full text-destructive px-0 mt-2"><Link href="/login">Log Out</Link></Button>
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
