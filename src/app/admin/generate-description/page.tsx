import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GenerateDescriptionForm from "@/components/generate-description-form";

export default function GenerateDescriptionPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Content Generator</h1>
        <p className="mt-1 text-muted-foreground">
            Effortlessly create compelling, luxurious product descriptions for your abayas using the power of AI.
        </p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Enter Product Details</CardTitle>
          <CardDescription>
            Provide keywords and a brief summary. Our AI will do the rest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GenerateDescriptionForm />
        </CardContent>
      </Card>
    </div>
  );
}
