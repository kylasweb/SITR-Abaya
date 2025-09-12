import SignupForm from '@/components/signup-form';

export default function SignupPage() {
  return (
    <div className="container flex items-center justify-center py-12 md:py-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">Join our world of elegance and sophistication.</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
