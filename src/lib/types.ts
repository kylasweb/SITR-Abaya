export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  aiHint: string;
};

export type ProductVariant = {
  size: string[];
  color: string[];
  material: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  variants: ProductVariant;
  category: string;
  tags: string[];
};
