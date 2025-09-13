import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddCollectionPage() {
  return (
    <div className="max-w-3xl mx-auto">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Collection</h1>
        <p className="mt-1 text-muted-foreground">
            Fill out the details below to create a new product collection.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Collection Details</CardTitle>
          <CardDescription>
            Provide a name and description for your new collection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Collection Name</Label>
                <Input id="name" name="name" placeholder="e.g., Summer Edit" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="A short description of the collection." rows={3} />
            </div>
            <Button type="submit">Create Collection</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
