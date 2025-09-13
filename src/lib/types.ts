export type ProductImage = {
  id: string; // Placeholder ID or future reference
  url: string; // URL from Firebase Storage or placeholder service
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

export type NewProduct = Omit<Product, 'id' | 'slug' | 'images'> & {
  images: { url: string; alt: string; aiHint: string }[];
};


export type EditableProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  sizes: string[];
  materials: string[];
  imageUrls: string[]; // We'll manage existing images by URL
};

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
  id: string; // This is the Firestore document ID
  userId: string;
  customerName: string;
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

export type UserData = {
    uid: string;
    name: string;
    email: string;
    createdAt: Date;
}

// --- Expense Tracking Types ---

export type Expense = {
  id: string; // Firestore document ID
  date: Date;
  category: string;
  amount: number;
  description: string;
  createdAt: Date;
};

export type NewExpense = Omit<Expense, 'id' | 'createdAt' | 'date'> & {
    date: string; // Date comes from form as a string
};


// --- Site Settings Types ---

export type GeneralSettings = {
    siteTitle: string;
    tagline: string;
    contactEmail: string;
}

export type AppearanceSettings = {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
}

export type NavigationLink = {
    label: string;
    url: string;
}

export type NavigationSettings = {
    header: NavigationLink[];
}

export type PaymentGatewaySettings = {
    enabled: boolean;
    keyId?: string;
    keySecret?: string;
    merchantId?: string;
    saltKey?: string;
    merchantKey?: string;
}

export type PaymentSettings = {
    razorpay: PaymentGatewaySettings;
    phonepe: PaymentGatewaySettings;
    paytm: PaymentGatewaySettings;
}

export type FeatureItem = {
    icon: string;
    title: string;
    description: string;
}

export type HomepageSettings = {
    featureItems: FeatureItem[];
}


export type SiteSettings = {
    general: GeneralSettings;
    appearance: AppearanceSettings;
    navigation: NavigationSettings;
    payments: PaymentSettings;
    homepage: HomepageSettings;
}
