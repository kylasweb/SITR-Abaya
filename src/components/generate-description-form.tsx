"use client";

import { useState, useRef } from 'react';
import { Bot, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

declare const puter: any;

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Generate Description
        </>
      )}
    </Button>
  );
}

export default function GenerateDescriptionForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('');

  const handleGeneration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setDescription('');

    const formData = new FormData(event.currentTarget);
    const keywords = formData.get('keywords') as string;
    const summary = formData.get('summary') as string;

    if (!keywords) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Keywords are required to generate a description.",
      });
      setIsLoading(false);
      return;
    }

    const prompt = `You are an expert copywriter specializing in creating luxurious product descriptions for abayas.

Based on the provided keywords and summary, generate a compelling and detailed product description that highlights the abaya's unique features, design inspiration, and target audience. Focus on attracting customers with a sense of elegance and sophistication.

Keywords: ${keywords}
Summary: ${summary || 'Not provided.'}

Product Description:`;

    try {
      if (typeof puter === 'undefined') {
        throw new Error('Puter.js is not loaded.');
      }
      
      const result = await puter.ai.chat(prompt);

      if (result) {
        setDescription(result);
        formRef.current?.reset();
      } else {
         toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "The AI could not generate a description. Please try refining your keywords.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An unexpected error occurred.",
        description: "Please check the console for details and ensure Puter.js is loaded.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form ref={formRef} onSubmit={handleGeneration} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="keywords">Keywords</Label>
        <Textarea
          id="keywords"
          name="keywords"
          placeholder="e.g., black silk, elegant evening wear, silver embroidery, timeless"
          required
          rows={3}
        />
        <p className="text-sm text-muted-foreground">
          Comma-separated keywords describing the abaya.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="summary">Summary (Optional)</Label>
        <Textarea
          id="summary"
          name="summary"
          placeholder="e.g., A graceful abaya inspired by starry nights, designed for formal events."
          rows={3}
        />
        <p className="text-sm text-muted-foreground">
          A brief summary including design inspiration or target audience.
        </p>
      </div>

      <div className="flex justify-end">
        <SubmitButton pending={isLoading} />
      </div>

      {description && (
        <Card className="mt-6 bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Generated Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed whitespace-pre-wrap">{description}</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
