import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <div className="flex justify-center mb-6">
            <Construction className="h-16 w-16 text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Coming Soon</h1>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          We are working hard to bring you a new collection of beautiful products. Stay tuned for our exciting launch!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Shop Abayas</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
