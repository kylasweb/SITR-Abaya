'use client';
import Link from 'next/link';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';

export default function WishlistPage() {
  const { wishlist: wishlistItems } = useStore();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">My Wishlist</h1>
        <p className="mt-2 text-muted-foreground">
          Your curated collection of favorite pieces.
        </p>
      </header>
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">Your Wishlist is Empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added any favorites yet.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
