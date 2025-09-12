import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddProductForm } from "./add-product-form";

export default function AddProductPage() {
  return (
    <div className="max-w-3xl mx-auto">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="mt-1 text-muted-foreground">
            Fill out the details below to add a new abaya to your collection.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Please provide the necessary information for the new product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
