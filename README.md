# SITR Abaya E-commerce Store

SITR is a feature-rich, production-ready e-commerce application built for a luxury modest fashion brand. It features a complete customer-facing storefront, a comprehensive admin dashboard for store management, and leverages modern web technologies to deliver a high-performance, scalable, and user-friendly experience.

The entire application, from the database schema to the AI-powered features, was designed and implemented by an AI assistant in Firebase Studio.

---

## Features

### 🛍️ Storefront & E-commerce

*   **Dynamic Homepage**: Features a hero section, featured products, and custom content blocks.
*   **Product Listings**: A filterable and sortable product gallery page.
*   **Product Details**: Individual product pages with image galleries, size/color selectors, and detailed descriptions.
*   **Shopping Cart**: Persistent cart functionality using local storage.
*   **Wishlist**: Allows users to save their favorite items.
*   **Secure Checkout**: Multi-step checkout process that integrates with Firebase for order creation.
*   **User Authentication**: Complete login, signup, and profile management powered by Firebase Authentication.
*   **Order History**: Users can view their past orders on their profile page.
*   **Multi-Currency Support**: View prices in various global currencies with real-time conversion rates.

### ⚙️ Admin Dashboard

*   **Protected Routes**: Secure admin section for store management.
*   **Dashboard Overview**: At-a-glance view of key metrics like total revenue, sales, and new customers with performance charts.
*   **Product Management (CRUD)**: Full capabilities to create, read, update, and delete products, including image uploads to Firebase Storage.
*   **Order Management**: View and manage all customer orders.
*   **Customer Management**: View a list of all registered users.
*   **AI Content Studio**: An integrated tool to generate product descriptions, social media posts, and more using generative AI.
*   **Site Settings Management**:
    *   **General**: Update site title, tagline, etc.
    *   **Appearance**: Modify theme colors (coming soon).
    *   **Homepage**: Manage content blocks and featured items.
    *   **Navigation**: Control menu links.
*   **Accounting**: A built-in bookkeeping tool to track business expenses.

### 🤖 AI Integration (Genkit)

*   **Related Products**: An AI-powered "You Might Also Like" section on product pages to drive engagement.
*   **Content Generation**: AI tools in the admin dashboard to assist with creating marketing copy and product details.

---

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) for components.
*   **Database**: [Firestore](https://firebase.google.com/docs/firestore) (for products, orders, users, etc.)
*   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **File Storage**: [Firebase Storage](https://firebase.google.com/docs/storage) (for product images)
*   **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit) (for AI flows and model interaction)
*   **State Management**: Zustand (via `useStore`)
*   **Forms**: React Hook Form with Zod for validation.
*   **Deployment**: Ready for Vercel and Netlify.

---

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn
*   A Firebase project

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Firebase project configuration keys:
    ```env
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket.appspot.com
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id

    # A secure, random password for admin login
    ADMIN_PASSWORD=your-secret-admin-password
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Deployment

This project is configured for easy deployment on both Vercel and Netlify.

### Vercel

Push your code to a GitHub repository and link it to a new Vercel project. Vercel will automatically detect the Next.js framework and configure the build settings. Ensure you add your environment variables to the Vercel project settings.

### Netlify

Push your code to a GitHub repository and link it to a new Netlify project. The `netlify.toml` file in the repository will automatically configure the build settings for Next.js. Ensure you add your environment variables to the Netlify site settings.
