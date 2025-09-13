# SITR Abaya Store: Production-Ready MVP Roadmap

This document outlines a phase-by-phase development plan to take the e-commerce application from its current state to a production-ready MVP. The phases prioritize critical features for a functional and secure online store.

---

## Phase 1: Core E-commerce & User Authentication

**Goal:** Implement the essential features for a user to create an account, purchase a product, and for the order to be securely recorded. This is the highest priority.

### 1.1: Customer Authentication
*   **Task:** Implement backend logic for user registration and login.
*   **Details:**
    *   Connect the existing Login (`/login`) and Signup (`/signup`) forms to Firebase Authentication.
    *   Create server actions to handle `createUserWithEmailAndPassword` and `signInWithEmailAndPassword`.
    *   Implement session management using Firebase's client-side persistence. The `AuthProvider` is already set up to track the user's state.
    *   Protect user-specific pages like `/account/profile` so they are only accessible to logged-in users.
*   **Files to Modify:** `src/components/login-form.tsx`, `src/components/signup-form.tsx`, create new server action files.

### 1.2: Order & Checkout Logic
*   **Task:** Build out the backend logic for the checkout process.
*   **Details:**
    *   **Order Schema:** Define an `Order` type in `src/lib/types.ts` and a corresponding schema for Firestore. It should include user ID, items purchased, shipping address, total price, and order status.
    *   **Payment Gateway:** Integrate a payment provider (e.g., Stripe). This involves creating a checkout session, handling the payment intent, and processing webhooks to confirm successful payments.
    *   **"Place Order" Action:** Update the server action for the checkout page (`/checkout`) to:
        1.  Process the payment via the chosen gateway.
        2.  On successful payment, create a new order document in the Firestore `orders` collection.
        3.  Clear the user's cart.
*   **Files to Modify:** `/checkout/page.tsx`, create new server actions, `src/lib/types.ts`.

### 1.3: Database Security (RLS)
*   **Task:** Implement Firestore Security Rules to protect user and order data. **This is a critical security task.**
*   **Details:**
    *   Write rules in `firestore.rules` to replace the insecure "test mode" rules.
    *   **Rules Required:**
        *   Allow public read-only access to the `products` collection.
        *   Allow authenticated users to create documents in the `orders` collection.
        *   Allow users to only read/update their *own* documents in the `users` and `orders` collections (e.g., `allow read, write: if request.auth.uid == resource.data.userId;`).
        *   Restrict all write access for unauthorized users.
*   **Files to Modify:** `firestore.rules` (in the root of the Firebase project, not the codebase).

### 1.4: Dynamic User Account Page
*   **Task:** Make the user profile page (`/account/profile`) dynamic.
*   **Details:**
    *   Fetch and display the logged-in user's actual information (name, email) from the `useAuth` hook.
    *   Implement an "Order History" section that fetches and displays a list of orders from the Firestore `orders` collection for the currently logged-in user.
*   **Files to Modify:** `src/app/account/profile/page.tsx`.

---

## Phase 2: Admin Product & Order Management (CRUD)

**Goal:** Complete the Content Management System (CMS) capabilities for the store owner.

### 2.1: Complete Product CRUD Functionality
*   **Task:** Implement the "Edit" and "Delete" functionality for products.
*   **Details:**
    *   **Edit:** Create an "Edit Product" page (`/admin/products/[id]/edit`) that pre-fills a form with the existing product data. Create a server action to update the product document in Firestore.
    *   **Delete:** Create a server action that deletes the corresponding product document from Firestore. Wire this up to the "Delete" button in the product table, including a confirmation dialog to prevent accidental deletion.
*   **Files to Modify:** `src/app/admin/products/product-table.tsx`, create new pages and server actions.

### 2.2: Order Management Page
*   **Task:** Build the "Orders" page in the admin dashboard.
*   **Details:**
    *   Create a new page at `/admin/orders` that fetches and displays all orders from the `orders` collection in a table.
    *   The table should include key information like Order ID, Customer Name/Email, Date, Total Price, and Status.
    *   (Optional) Implement a detail view to see the specific items in each order.
*   **Files to Modify:** Create new page `/admin/orders/page.tsx` and associated components.

### 2.3: Customer Management Page
*   **Task:** Build a basic "Customers" page in the admin dashboard.
*   **Details:**
    *   Create a new page at `/admin/customers` that lists all registered users from Firebase Authentication.
    *   Display user information such as UID, Email, and creation date.
*   **Files to Modify:** Create new page `/admin/customers/page.tsx`.

---

## Phase 3: Media Management & UI Polish

**Goal:** Replace the placeholder image system with a real file upload solution and complete remaining UI features.

### 3.1: Image Uploads for Products
*   **Task:** Implement a system for admins to upload product images.
*   **Details:**
    *   Integrate **Firebase Storage** for handling file uploads.
    *   Update the "Add Product" and "Edit Product" forms to include a file input for uploading multiple images.
    *   When an admin uploads an image, the server action should:
        1.  Upload the file to Firebase Storage.
        2.  Get the public URL for the uploaded image.
        3.  Save this URL in the product document in Firestore, replacing the placeholder ID system.
    *   Leverage `next/image` and a CDN (like Firebase Storage's) for optimization.
*   **Files to Modify:** `src/app/admin/products/new/add-product-form.tsx`, its server action, and the new edit product form.

### 3.2: Implement Product Filtering & Sorting
*   **Task:** Make the filtering and sorting controls on the `/products` page functional.
*   **Details:**
    *   Convert the products page to a client component that fetches data based on state.
    *   When a user applies filters (category, size, etc.) or changes the sort order, update the component's state.
    *   Trigger a new fetch to Firestore with the appropriate `where` and `orderBy` clauses to get the filtered/sorted product list.
    *   Re-render the product grid with the new data.
*   **Files to Modify:** `src/app/products/page.tsx`, `src/components/product-filters.tsx`.
