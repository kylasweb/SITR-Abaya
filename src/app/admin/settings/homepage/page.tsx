import { getSiteSettings } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomepageFeaturesForm } from "./homepage-features-form";

export default async function HomepageSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Homepage Content</h1>
        <p className="mt-1 text-muted-foreground">
          Manage the content displayed in various sections of your homepage.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Feature Blocks</CardTitle>
          <CardDescription>
            Manage the items in the "Why Choose SITR?" section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HomepageFeaturesForm initialItems={settings.homepage.featureItems} />
        </CardContent>
      </Card>
    </div>
  );
}
