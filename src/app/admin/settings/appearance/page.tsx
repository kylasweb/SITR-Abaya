import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSiteSettings } from "@/lib/data";

export default async function AppearanceSettingsPage() {
  const settings = await getSiteSettings();

  return (
     <div className="max-w-3xl mx-auto">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
        <p className="mt-1 text-muted-foreground">
          Customize the look and feel of your website.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Theme Colors</CardTitle>
          <CardDescription>
            Define the primary color palette for your site. Changes will be reflected globally.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary</Label>
                    <Input id="primary-color" defaultValue={settings.appearance.primaryColor} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary</Label>
                    <Input id="secondary-color" defaultValue={settings.appearance.secondaryColor} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent</Label>
                    <Input id="accent-color" defaultValue={settings.appearance.accentColor} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="background-color">Background</Label>
                    <Input id="background-color" defaultValue={settings.appearance.backgroundColor} />
                </div>
            </div>
             <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
