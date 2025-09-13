import { Separator } from "@/components/ui/separator";
import { Truck, Box, Undo } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
       <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Shipping & Returns</h1>
        <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
          Information about how we get our products to you and our policy on returns.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Shipping Section */}
        <section>
          <h2 className="font-headline text-3xl font-semibold flex items-center gap-3">
            <Truck className="h-8 w-8 text-primary" />
            Shipping Policy
          </h2>
          <Separator className="my-4" />
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>We are pleased to offer complimentary standard shipping on all orders over $200. For orders under this amount, a flat rate shipping fee will be applied at checkout.</p>
            <h3 className="font-semibold text-lg pt-2">Processing Time:</h3>
            <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or public holidays.</p>
            <h3 className="font-semibold text-lg pt-2">Shipping Rates & Delivery Estimates:</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Domestic (UAE):</strong> 2-3 business days.</li>
                <li><strong>International (GCC):</strong> 5-7 business days.</li>
                <li><strong>International (Rest of World):</strong> 7-14 business days.</li>
            </ul>
            <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).</p>
          </div>
        </section>

        {/* Returns Section */}
        <section>
          <h2 className="font-headline text-3xl font-semibold flex items-center gap-3">
            <Undo className="h-8 w-8 text-primary" />
            Return Policy
          </h2>
          <Separator className="my-4" />
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>We hope you love your SITR piece, but if you are not completely satisfied, we are happy to accept returns on most items.</p>
            <h3 className="font-semibold text-lg pt-2">Conditions for Return:</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Returns must be initiated within 14 days of the delivery date.</li>
                <li>Items must be in their original, unworn, and unwashed condition with all tags still attached.</li>
                <li>Items marked as "Final Sale" cannot be returned or exchanged.</li>
            </ul>
             <h3 className="font-semibold text-lg pt-2">How to Initiate a Return:</h3>
             <p>To start a return, please visit our <a href="/contact" className="underline font-semibold hover:text-primary">Contact Page</a> and send us a message with your order number and the item(s) you wish to return. Our customer service team will guide you through the process.</p>
             <h3 className="font-semibold text-lg pt-2">Refunds:</h3>
             <p>Once we receive and inspect your return, we will process your refund to the original method of payment. Please allow 5-10 business days for the refund to appear on your statement.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
