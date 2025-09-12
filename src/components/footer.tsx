import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-headline text-lg font-semibold">Stay in the Loop</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Subscribe to our newsletter for exclusive collections, new arrivals, and special offers.
            </p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit" variant="secondary">Subscribe</Button>
            </form>
          </div>

          <div>
            <h4 className="font-semibold font-headline">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-headline">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-foreground">Seller Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-headline">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Image src="https://placehold.co/120x40/000000/F6E9C7?text=SITR" alt="SITR Logo" width={100} height={35} />
            <p>&copy; {new Date().getFullYear()} SITR. All Rights Reserved.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            {/* Social media icons can be added here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
