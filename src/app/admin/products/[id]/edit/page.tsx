import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/lib/data";
import { EditProductForm } from "./edit-product-form";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="mt-1 text-muted-foreground">
            Update the details for "{product.name}".
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Modify the information and save your changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
}
