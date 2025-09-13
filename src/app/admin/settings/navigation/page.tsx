import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { PlusCircle, Trash2 } from "lucide-react";
import { getSiteSettings } from "@/lib/data";

export default async function NavigationSettingsPage() {
  const settings = await getSiteSettings();
  const menuItems = settings.navigation.header;

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Navigation</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your website's primary navigation menu.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Header Menu</CardTitle>
          <CardDescription>
            Drag and drop to reorder the links that appear in your main header.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-lg bg-background">
                <Button variant="ghost" size="icon" className="cursor-grab">
                    <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground" />
                </Button>
                <div className="grid grid-cols-2 gap-2 flex-1">
                    <Input defaultValue={item.label} placeholder="Link Label" />
                    <Input defaultValue={item.url} placeholder="URL or Path" />
                </div>
                 <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
           <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Link
          </Button>
          <div className="flex justify-end pt-4">
             <Button>Save Menu</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
