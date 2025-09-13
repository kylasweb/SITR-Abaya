import { Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
          We would love to hear from you. Whether you have a question about our products, an order, or anything else, our team is ready to answer all your questions.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
            <h2 className="font-headline text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4 text-muted-foreground">
                <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>support@sitr.com</span>
                </p>
                <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+1 (555) 123-4567</span>
                </p>
                 <p className="text-sm pt-4">
                    Our customer service team is available from Sunday to Thursday, 9 AM to 5 PM (GMT+4).
                </p>
            </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="e.g., Question about an order" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} placeholder="Your message..." />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
