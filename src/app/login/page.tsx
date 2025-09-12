import LoginForm from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center py-12 md:py-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your account and wishlist.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
