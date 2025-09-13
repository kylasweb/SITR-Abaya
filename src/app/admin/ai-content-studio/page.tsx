import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AiContentStudio from "@/components/ai-content-studio";
import { Bot } from "lucide-react";

export default function AiContentStudioPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bot className="h-7 w-7" />
            AI Content Studio
        </h1>
        <p className="mt-1 text-muted-foreground">
            Generate high-quality marketing copy, product details, and more with the power of AI.
        </p>
      </header>
      
      <Card>
        <CardContent className="p-2 sm:p-4">
            <AiContentStudio />
        </CardContent>
      </Card>
    </div>
  );
}
