"use client";

import Link from 'next/link';
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Diamond } from '@/components/icons';

const mainNav = [
  { href: '/products', label: 'Shop' },
  { href: '/#', label: 'Size Guide' },
  { href: '/#', label: 'Ethos' },
  { href: '/#', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="bg-secondary/50 text-center text-sm py-1.5 px-4">
        Ramadan Kareem.
      </div>
      <div className="container flex h-20 items-center">
        <div className="flex-1 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <Link
                href="/"
                className="mb-8 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
                >
                <Diamond className="h-6 w-6" />
                <span className="font-bold font-headline text-lg">Abaya AI</span>
                </Link>
                <div className="flex flex-col space-y-4">
                {mainNav.map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg transition-colors hover:text-foreground/80 text-foreground/80"
                    >
                    {item.label}
                    </Link>
                ))}
                </div>
            </SheetContent>
            </Sheet>
        </div>

        <div className="flex-1 justify-start items-center hidden md:flex">
             {/* Future country selector can go here */}
        </div>

        <div className="flex-2 flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
                <Diamond className="h-8 w-8" />
                <span className="text-3xl font-bold sm:inline-block font-headline">Abaya AI</span>
            </Link>
        </div>

        <div className="flex-1 flex justify-end items-center">
             <nav className="flex items-center">
                <Button variant="ghost" size="icon" aria-label="Search" className="hidden md:inline-flex">
                <Search className="h-5 w-5" />
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="User Account">
                <Link href="/login">
                    <User className="h-5 w-5" />
                </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="Wishlist">
                <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="Shopping Cart">
                <Link href="/cart">
                    <ShoppingBag className="h-5 w-5" />
                </Link>
                </Button>
            </nav>
        </div>

      </div>
       <div className="hidden md:flex justify-center border-t">
          <nav className="flex items-center space-x-12 text-base py-3">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
    </header>
  );
}
