import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';
import { Logo } from './icons';

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
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Abayas</Link></li>
              <li><Link href="/collections/coming-soon" className="text-muted-foreground hover:text-foreground">Hijabs</Link></li>
              <li><Link href="/collections/coming-soon" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-headline">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/admin/login" className="text-muted-foreground hover:text-foreground">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-headline">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/support/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="/support/shipping-returns" className="text-muted-foreground hover:text-foreground">Shipping & Returns</Link></li>
              <li><Link href="/support/privacy-policy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-8 w-8 flex items-center justify-center rounded-md">
                <Logo className="h-5 w-5" />
            </div>
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
