import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What sizes do you offer?",
    answer: "We offer a range of sizes from 50 to 60. You can find a detailed size chart on each product page to help you find the perfect fit."
  },
  {
    question: "What are your abayas made of?",
    answer: "Our abayas are crafted from a variety of high-quality materials including Nida, crepe, silk, and linen. The specific material for each product is listed in its description."
  },
  {
    question: "How do I care for my abaya?",
    answer: "To ensure the longevity of your garment, we recommend dry cleaning for most of our abayas, especially those with delicate embroidery or made from materials like silk. Please check the care label on your specific item for detailed instructions."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we are proud to offer worldwide shipping. Shipping costs and delivery times vary by location. Please see our Shipping & Returns page for more details."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns on unworn items with tags still attached within 14 days of delivery. Please visit our Shipping & Returns page for detailed information on how to process a return."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has been shipped, you will receive an email with a tracking number and a link to track your package."
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
          Find answers to common questions about our products, shipping, and returns.
        </p>
      </header>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
             <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="font-headline text-lg text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
