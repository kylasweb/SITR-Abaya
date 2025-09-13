import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">About SITR</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Elegance Redefined, Modesty Embraced.
            </p>
            <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Founded on the principles of grace and contemporary design, SITR is a celebration of modest fashion. Our name, derived from the Arabic word for 'covering' or 'protection', reflects our core philosophy: to create garments that are not only beautiful but also embody a sense of dignity and poise.
              </p>
              <p>
                We believe that modesty is not about hiding, but about revealing one's true self with confidence and sophistication. Each abaya in our collection is a testament to this belief, meticulously crafted from the finest fabrics sourced from around the world. From the subtle shimmer of Nida to the gentle drape of pure silk, every material is chosen for its quality, comfort, and timeless appeal.
              </p>
              <p>
                Our design process is a dialogue between tradition and modernity. We honor the rich heritage of the abaya while infusing it with contemporary details, clean lines, and a minimalist aesthetic. The result is a collection of versatile pieces that can be worn for any occasion, from everyday moments to the most special events.
              </p>
              <p>
                At SITR, we are more than just a brand; we are a community of women who value style, quality, and faith. We are committed to ethical practices and exceptional craftsmanship, ensuring that every piece you receive is made with love and integrity.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-w-3 aspect-h-4 relative">
              <Image
                src="https://picsum.photos/seed/aboutus/800/1000"
                alt="A designer sketching an abaya design"
                fill
                className="object-cover rounded-lg shadow-lg"
                data-ai-hint="fashion designer sketch"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
