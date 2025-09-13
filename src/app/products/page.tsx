'use client';

import { getProducts } from '@/lib/data';
import ProductCard from '@/components/product-card';
import ProductFilters from '@/components/product-filters';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('featured');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    let sorted = [...allProducts];
    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming IDs are sortable for "newest". A real app would use a createdAt timestamp.
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        // Default order from fetch is fine for "featured"
        break;
    }
    return sorted;
  }, [allProducts, sortOrder]);
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Collection</h1>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
          Explore our range of meticulously crafted abayas, designed for elegance, comfort, and modern sophistication.
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <ProductFilters />
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {loading ? 'Loading...' : `${sortedProducts.length} products`}
            </p>
            <Select onValueChange={setSortOrder} defaultValue={sortOrder}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="aspect-[2/3] w-full" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination could be added here */}
        </main>
      </div>
    </div>
  );
}
