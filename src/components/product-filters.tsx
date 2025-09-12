"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react";
import { Button } from "./ui/button";

const categories = ["Daywear", "Evening Wear", "Formal Wear", "Workwear"];
const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = ["Black", "Beige", "Green", "Navy", "White", "Grey"];
const materials = ["Silk", "Linen", "Velvet", "Crepe", "Cotton"];

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <div className="sticky top-20">
      <h2 className="font-headline text-xl font-semibold mb-4">Filters</h2>
      <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="font-body text-base">Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`cat-${category}`} />
                  <Label htmlFor={`cat-${category}`} className="font-normal">{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="size">
          <AccordionTrigger className="font-body text-base">Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`} className="font-normal">{size}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <AccordionTrigger className="font-body text-base">Color</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {colors.map(color => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox id={`color-${color}`} />
                  <Label htmlFor={`color-${color}`} className="font-normal">{color}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="material">
          <AccordionTrigger className="font-body text-base">Material</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {materials.map(material => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox id={`mat-${material}`} />
                  <Label htmlFor={`mat-${material}`} className="font-normal">{material}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="font-body text-base">Price</AccordionTrigger>
          <AccordionContent>
            <div className="p-1">
               <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <Slider
                defaultValue={priceRange}
                max={500}
                step={10}
                onValueChange={(value) => setPriceRange(value)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button className="w-full mt-6">Apply Filters</Button>
    </div>
  )
}
