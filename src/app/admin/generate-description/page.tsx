import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GenerateDescriptionForm from "@/components/generate-description-form";

export default function GenerateDescriptionPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">AI Product Description Generator</h1>
          <p className="mt-2 text-muted-foreground">
            For our sellers. Effortlessly create compelling, luxurious product descriptions for your abayas using the power of AI.
          </p>
        </header>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Enter Product Details</CardTitle>
            <CardDescription>
              Provide keywords and a brief summary. Our AI will do the rest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GenerateDescriptionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
