import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProductTable from "./product-table";
import { getProducts } from "@/lib/data";


export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1">
                Manage your store's products.
            </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            A list of all products in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable products={products} />
        </CardContent>
      </Card>
    </div>
  );
}
