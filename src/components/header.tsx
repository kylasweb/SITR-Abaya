"use client";

import Link from 'next/link';
import { Heart, Menu, Search, ShoppingBag, User, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from './icons';

const mainNav = [
  { href: '/products', label: 'Abaya' },
  { href: '#', label: 'Hijabs' },
  { href: '#', label: 'Collections' },
  { href: '#', label: 'About Us' },
  { href: '#', label: 'Returns' },
];

const currencies = [
    { code: 'AED', name: 'United Arab Emirates Dirham' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound Sterling' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'KWD', name: 'Kuwaiti Dinar' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'OMR', name: 'Omani Rial' },
    { code: 'QAR', name: 'Qatari Riyal' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'USD', name: 'United States Dollar' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, wishlist } = useStore();
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].code);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={cn(
        "bg-primary text-primary-foreground text-center text-sm py-1.5 px-4 transition-all duration-300",
        isScrolled ? "h-0 py-0 overflow-hidden" : "h-auto"
      )}>
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
                  className="mb-8 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Logo className="h-8 w-auto" />
                  <span className="sr-only">SITR</span>
                </Link>
                <div className="flex flex-col space-y-4">
                {mainNav.map((item) => (
                    <Link
                    key={`${item.href}-${item.label}`}
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
            <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Select Currency">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {currencies.map(currency => (
                   <DropdownMenuItem key={currency.code} onSelect={() => setSelectedCurrency(currency.code)}>
                    {currency.code} - {currency.name}
                   </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="flex-2 flex justify-center">
            <Link href="/" className="flex items-center">
                <Logo className="h-10 w-auto" />
                <span className="sr-only">SITR</span>
            </Link>
        </div>

        <div className="flex-1 flex justify-end items-center">
             <nav className="flex items-center">
                <div className="md:hidden">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Select Currency">
                        <Globe className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {currencies.map(currency => (
                        <DropdownMenuItem key={currency.code} onSelect={() => setSelectedCurrency(currency.code)}>
                            {currency.code} - {currency.name}
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Button variant="ghost" size="icon" aria-label="Search" className="md:hidden">
                    <Search className="h-5 w-5" />
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="User Account">
                <Link href="/account/profile">
                    <User className="h-5 w-5" />
                </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="Wishlist" className="relative">
                <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                    {wishlist.length > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">{wishlist.length}</Badge>
                    )}
                </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
                <Link href="/cart">
                    <ShoppingBag className="h-5 w-5" />
                    {totalCartItems > 0 && (
                       <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">{totalCartItems}</Badge>
                    )}
                </Link>
                </Button>
            </nav>
        </div>

      </div>
       <div className="hidden md:flex justify-center border-t">
          <nav className="flex items-center space-x-12 text-base py-3">
            {mainNav.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
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
