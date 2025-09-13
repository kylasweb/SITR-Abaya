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

export type NewProduct = Omit<Product, 'id' | 'slug'>;

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
};

export type ShippingAddress = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
};

export type NewOrder = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>;
