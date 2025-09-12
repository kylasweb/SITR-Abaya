"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Bot, Loader2 } from 'lucide-react';

import { generateDescriptionAction, type FormState } from '@/app/admin/generate-description/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const initialState: FormState = {
  message: '',
  description: '',
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
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
  const [state, formAction] = useFormState(generateDescriptionAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state.message && state.message !== 'success' && state.timestamp !== prevStateRef.current.timestamp) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: state.message,
      });
    }
    prevStateRef.current = state;
  }, [state, toast]);

  useEffect(() => {
    if (state.message === 'success') {
      formRef.current?.reset();
    }
  }, [state.message]);


  return (
    <form ref={formRef} action={formAction} className="space-y-6">
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
        <SubmitButton />
      </div>

      {state.description && (
        <Card className="mt-6 bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Generated Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed whitespace-pre-wrap">{state.description}</p>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
