'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

type StoreContextType = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isItemInWishlist: (productId: string) => boolean;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, size: string, color: string, quantity: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );

      let newCart = [...prevCart];

      if (existingItemIndex > -1) {
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity,
        };
      } else {
        newCart.push({ product, quantity, size, color });
      }
      
      toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` });
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast({ title: "Removed from cart", description: `Item has been removed from your cart.` });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  }

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isWishlisted = prevWishlist.some(item => item.id === product.id);
      if (isWishlisted) {
        toast({ title: "Removed from wishlist", description: `${product.name} removed from your wishlist.` });
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        toast({ title: "Added to wishlist", description: `${product.name} added to your wishlist.` });
        return [...prevWishlist, product];
      }
    });
  };

  const isItemInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isItemInWishlist,
    clearCart
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}