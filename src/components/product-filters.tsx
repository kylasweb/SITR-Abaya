"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Dispatch, SetStateAction } from "react";

const allCategories = ["Daywear", "Evening Wear", "Formal Wear", "Workwear", "Occasion Wear"];
const allSizes = ["50", "52", "54", "56", "58", "60"];
const allMaterials = ["Silk", "Linen", "Velvet", "Crepe", "Cotton", "Nida", "Georgette"];

interface ProductFiltersProps {
    selectedCategories: string[];
    onCategoryChange: Dispatch<SetStateAction<string[]>>;
    selectedSizes: string[];
    onSizeChange: Dispatch<SetStateAction<string[]>>;
    selectedMaterials: string[];
    onMaterialChange: Dispatch<SetStateAction<string[]>>;
    priceRange: [number, number];
    onPriceChange: (value: [number, number]) => void;
}

export default function ProductFilters({
    selectedCategories,
    onCategoryChange,
    selectedSizes,
    onSizeChange,
    selectedMaterials,
    onMaterialChange,
    priceRange,
    onPriceChange,
}: ProductFiltersProps) {

  const handleCheckedChange = (
    setter: Dispatch<SetStateAction<string[]>>, 
    value: string, 
    isChecked: boolean | "indeterminate"
  ) => {
    setter(prev => {
      if (isChecked) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  }

  return (
    <div className="sticky top-20">
      <h2 className="font-headline text-xl font-semibold mb-4">Filters</h2>
      <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="font-body text-base">Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {allCategories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cat-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCheckedChange(onCategoryChange, category, checked)}
                  />
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
              {allSizes.map(size => (
                <div key={size} className="flex items-center space-x-2">
                   <Checkbox 
                    id={`size-${size}`} 
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={(checked) => handleCheckedChange(onSizeChange, size, checked)}
                  />
                  <Label htmlFor={`size-${size}`} className="font-normal">{size}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="material">
          <AccordionTrigger className="font-body text-base">Material</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {allMaterials.map(material => (
                <div key={material} className="flex items-center space-x-2">
                   <Checkbox 
                    id={`mat-${material}`} 
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={(checked) => handleCheckedChange(onMaterialChange, material, checked)}
                  />
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
                value={priceRange}
                max={500}
                step={10}
                onValueChange={onPriceChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
