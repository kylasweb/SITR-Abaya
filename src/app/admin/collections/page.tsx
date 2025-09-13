import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminCollectionsPage() {
  // In the future, we'll fetch collections from Firestore here.
  const collections: any[] = [];

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Collections</h1>
          <p className="text-muted-foreground mt-1">
            Group products into collections for your storefront.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/collections/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Collection
          </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Collections</CardTitle>
          <CardDescription>
            A list of all product collections in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-lg font-semibold">No Collections Yet</h3>
                <p className="mt-1 text-muted-foreground">Click "Add Collection" to create your first one.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
