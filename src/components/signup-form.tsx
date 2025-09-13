"use client";

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { signupWithEmailAndPasswordAction, type FormState } from '@/app/auth/actions';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FormLabel } from './ui/form';

const initialState: FormState = {
  message: '',
  success: false,
  timestamp: Date.now(),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Account...
        </>
      ) : (
        "Create Account"
      )}
    </Button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useFormState(signupWithEmailAndPasswordAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.timestamp > initialState.timestamp && state.message && !state.success) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="bg-background/50">
      <CardContent className="p-6">
        <form ref={formRef} action={formAction} className="space-y-6">
            <div className="space-y-2">
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <Input id="name" name="name" placeholder="Your Name" required />
            </div>
             <div className="space-y-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
             <div className="space-y-2">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={6} />
                 <p className="text-xs text-muted-foreground">Password must be at least 6 characters long.</p>
            </div>
            <SubmitButton />
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
