"use client";

import Image from 'next/image';
import type { ProductImage } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  
  if (!images || images.length === 0) {
    return (
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
             {/* Fallback UI */}
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
             <Image
                key={mainImage.id}
                src={mainImage.url}
                alt={mainImage.alt}
                data-ai-hint={mainImage.aiHint}
                fill
                className="object-cover animate-fade-in"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
        {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
                {images.map((image) => (
                    <button
                        key={image.id}
                        onClick={() => setMainImage(image)}
                        className={cn(
                            "relative aspect-square w-full overflow-hidden rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            mainImage.id === image.id ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-80"
                        )}
                    >
                        <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            className="object-cover"
                        />
                         <span className="sr-only">View image {image.alt}</span>
                    </button>
                ))}
            </div>
        )}
         <style jsx>{`
            @keyframes fade-in {
                from { opacity: 0.5; }
                to { opacity: 1; }
            }
            .animate-fade-in {
                animation: fade-in 0.3s ease-in-out;
            }
        `}</style>
    </div>
  )
}
