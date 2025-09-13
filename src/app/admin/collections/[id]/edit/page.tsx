import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function EditCollectionPage({ params }: { params: { id: string } }) {
  const collectionId = params.id;
  // In the future, fetch collection data by ID
  const collection = { name: "Summer Edit", description: "A placeholder description." };

  return (
    <div className="max-w-3xl mx-auto">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Collection</h1>
        <p className="mt-1 text-muted-foreground">
            Update the details for "{collection.name}".
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Collection Details</CardTitle>
          <CardDescription>
            Modify the information and save your changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <form className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Collection Name</Label>
                <Input id="name" name="name" defaultValue={collection.name} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={collection.description} rows={3} />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
