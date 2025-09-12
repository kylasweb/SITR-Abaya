"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { toggleWishlist, isItemInWishlist } = useStore();
  const isInWishlist = isItemInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }

  return (
    <Card className={cn('overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-lg bg-transparent group', className)}>
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Link href={`/products/${product.slug}`} className="focus:outline-none">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              data-ai-hint={product.images[0].aiHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Add to wishlist"
            onClick={handleWishlistToggle}
          >
            <Heart className={cn("h-4 w-4", isInWishlist && "fill-destructive text-destructive")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pb-2">
        <Link href={`/products/${product.slug}`} className="focus:outline-none">
          <CardTitle className="font-body text-lg font-medium leading-tight tracking-normal">
            <span className="link-underline link-underline-black">
              {product.name}
            </span>
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-base text-muted-foreground">${product.price.toFixed(2)}</p>
      </CardFooter>
      <style jsx>{`
        .link-underline {
          border-bottom-width: 0;
          background-image: linear-gradient(transparent, transparent), linear-gradient(hsl(var(--foreground)), hsl(var(--foreground)));
          background-size: 0 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size .3s ease-in-out;
        }

        .link-underline-black {
          background-image: linear-gradient(transparent, transparent), linear-gradient(hsl(var(--foreground)), hsl(var(--foreground)))
        }

        .link-underline:hover {
          background-size: 100% 1px;
          background-position: 0 100%;
        }
      `}</style>
    </Card>
  );
}
