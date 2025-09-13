import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GeneralSettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage the core settings for your online store.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Site Details</CardTitle>
          <CardDescription>
            This information is used across your site and in communications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="site-title">Site Title</Label>
                <Input id="site-title" defaultValue="SITR Abaya" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" defaultValue="Elegance Redefined, Modesty Embraced." />
            </div>
             <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="support@sitr.com" />
            </div>
             <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
