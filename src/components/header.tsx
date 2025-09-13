"use client";

import Link from 'next/link';
import { Heart, Menu, Search, ShoppingBag, User, Globe, X, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useStore, currencies } from '@/lib/store';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from './icons';
import { ThemeToggle } from './theme-toggle';

const mainNav = [
  { href: '/products', label: 'Abayas' },
  { href: '/collections/coming-soon', label: 'Hijabs' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, wishlist, setCurrency, selectedCurrency } = useStore();

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
        Free Worldwide Shipping on Orders Over $200
      </div>
      <div className="container px-4">
        {/* Top bar: Mobile Menu, Logo, Actions */}
        <div className="grid grid-cols-3 items-center h-20">
          {/* Left-side: Mobile Menu & Search */}
          <div className="flex justify-start items-center">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                  <Button
                  variant="ghost"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                  aria-label="Toggle Menu"
                  >
                  <Menu className="h-6 w-6" />
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                  <Link
                    href="/"
                    className="mb-8 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Logo className="h-6 w-6 mr-2" />
                    <span className="font-headline text-2xl">SITR</span>
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
               <Button variant="ghost" size="icon" aria-label="Search" className="hidden md:inline-flex">
                  <Search className="h-5 w-5" />
              </Button>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center">
              <Link href="/" className="flex items-center gap-2">
                  <Logo className="h-7 w-7" />
                  <span className="font-headline text-3xl font-bold tracking-tighter">SITR</span>
              </Link>
          </div>

          {/* Right-side Actions */}
          <div className="flex justify-end items-center">
             <ThemeToggle />
              <div className="flex items-center ml-1">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Select Currency">
                              <Globe className="h-5 w-5" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                          {currencies.map(currency => (
                          <DropdownMenuItem key={currency.code} onSelect={() => setCurrency(currency.code)}>
                              {selectedCurrency.code === currency.code && <Check className="mr-2 h-4 w-4" />}
                              {currency.code} - {currency.name}
                          </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                  </DropdownMenu>
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
              </div>
          </div>
        </div>

        {/* Bottom bar: Desktop Navigation */}
        <nav className="hidden md:flex justify-center items-center space-x-12 text-base py-3 border-t">
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
