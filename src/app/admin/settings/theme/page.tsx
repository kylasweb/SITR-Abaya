import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ThemeEditorPage() {
  return (
    <div>
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Theme Editor</h1>
        <p className="mt-1 text-muted-foreground">
          Visually customize your site's appearance.
        </p>
      </header>
       <Card>
         <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            A visual theme editor is under development. For now, you can adjust the theme colors in the Appearance settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-semibold">Visual Editor Pending</h3>
            <p className="mt-1 text-muted-foreground">This feature will allow you to see live previews of your color and font changes.</p>
             <Button variant="secondary" className="mt-4" disabled>Coming Soon</Button>
          </div>
        </CardContent>
       </Card>
    </div>
  );
}
