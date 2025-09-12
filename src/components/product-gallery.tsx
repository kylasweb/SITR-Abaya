"use client";

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from './ui/card';
import type { ProductImage } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  
  // This is a simplified gallery for single image products.
  // For multiple images, we would build out a more complex component.
  if (images.length <= 1) {
    return (
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
             <Image
                src={mainImage.url}
                alt={mainImage.alt}
                data-ai-hint={mainImage.aiHint}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    )
  }

  // Placeholder for a more complex gallery with multiple images
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
        <Image
            src={mainImage.url}
            alt={mainImage.alt}
            data-ai-hint={mainImage.aiHint}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
        />
    </div>
  )
}
