"use client";

import { useState, FormEvent, useActionState } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

declare const puter: any;

interface SubmitButtonProps {
  pending: boolean;
  text?: string;
}

function SubmitButton({ pending, text = "Generate" }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
}

function OutputCard({ title, content }: { title: string, content: string }) {
    if (!content) return null;
    return (
        <Card className="mt-6 bg-secondary/50">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2 text-xl">
                <Bot className="h-5 w-5" />
                {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="leading-relaxed whitespace-pre-wrap font-body text-base">{content}</p>
            </CardContent>
        </Card>
    )
}

export default function AiContentStudio() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});

  const handleGeneration = async (event: FormEvent<HTMLFormElement>, generatorType: string, prompt: string) => {
    event.preventDefault();
    setIsLoading(true);
    setGeneratedContent(prev => ({ ...prev, [generatorType]: '' }));

    try {
      if (typeof puter === 'undefined') {
        throw new Error('Puter.js is not available.');
      }

      // The puter.ai.chat() function will handle authentication as needed.
      // In a local dev environment, this will often work without an explicit user login.
      // In a deployed app, it will prompt the user to log in if they haven't already.
      const result = await puter.ai.chat(prompt);

      if (result) {
        setGeneratedContent(prev => ({ ...prev, [generatorType]: result }));
      } else {
         toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "The AI could not generate a response. Please try refining your inputs.",
        });
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Please check the console for details.";
      toast({
        variant: "destructive",
        title: "An unexpected error occurred.",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const createProductDescription = (e: FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.currentTarget);
      const keywords = formData.get('keywords') as string;
      const summary = formData.get('summary') as string;
      const productType = formData.get('productType') as string;

       if (!keywords) {
          toast({ variant: "destructive", title: "Keywords are required." });
          return;
        }
      
      let templatePrompt = '';
      switch (productType) {
        case 'Abaya':
          templatePrompt = `Focus on elegance, flow, modesty, and the quality of the fabric. Use evocative language that speaks to a sense of luxury and grace.`;
          break;
        case 'Hijab':
          templatePrompt = `Focus on the material's softness, drape, and opacity. Mention its versatility for different styles and occasions.`;
          break;
        default:
           templatePrompt = `Describe the item's key features, materials, and ideal use case.`;
      }

      const prompt = `You are an expert copywriter for a luxury modest fashion brand called SITR. Your tone is elegant, sophisticated, and evocative.

Generate a compelling product description for a ${productType.toLowerCase()} based on the following details. It should be 2-3 paragraphs long.

${templatePrompt}

Keywords: ${keywords}
Summary: ${summary || 'Not provided.'}

Product Description:`;
      handleGeneration(e, 'productDescription', prompt);
  };
  
  const createSocialMediaPost = (e: FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.currentTarget);
      const topic = formData.get('topic') as string;
      const platform = formData.get('platform') as string;
      const tone = formData.get('tone') as string;
       if (!topic) {
          toast({ variant: "destructive", title: "Topic/Product is required." });
          return;
        }
      const prompt = `You are a social media manager for a luxury abaya brand, SITR.

Generate a social media post for ${platform}.
The post should be about: "${topic}".
The tone should be: ${tone}.

Include relevant hashtags.

Generated Post:`;
      handleGeneration(e, 'socialMediaPost', prompt);
  };
  
  const createSEODescription = (e: FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.currentTarget);
      const productName = formData.get('productName') as string;
      const keywords = formData.get('keywords') as string;
       if (!productName || !keywords) {
          toast({ variant: "destructive", title: "Product Name and Keywords are required." });
          return;
        }
      const prompt = `You are an SEO expert for an e-commerce store.

Generate a meta description for a product page. It must be a maximum of 160 characters.

Product Name: ${productName}
Keywords: ${keywords}

Meta Description:`;
      handleGeneration(e, 'seoDescription', prompt);
  };

  const createBlogPostIdeas = (e: FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.currentTarget);
      const topic = formData.get('topic') as string;
       if (!topic) {
          toast({ variant: "destructive", title: "Topic is required." });
          return;
        }
      const prompt = `You are a content strategist for a luxury fashion brand.

Generate 5 blog post ideas based on the topic: "${topic}".
The ideas should be engaging, relevant to an audience interested in modest fashion, and aimed at driving traffic to an e-commerce store.

Format the output as a numbered list.

Blog Post Ideas:`;
      handleGeneration(e, 'blogPostIdeas', prompt);
  };


  return (
    <Tabs defaultValue="product-description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="product-description" className="text-xs sm:text-sm">Product Description</TabsTrigger>
            <TabsTrigger value="social-post" className="text-xs sm:text-sm">Social Media Post</TabsTrigger>
            <TabsTrigger value="seo-meta" className="text-xs sm:text-sm">SEO Description</TabsTrigger>
            <TabsTrigger value="blog-ideas" className="text-xs sm:text-sm">Blog Ideas</TabsTrigger>
        </TabsList>
        
        {/* PRODUCT DESCRIPTION */}
        <TabsContent value="product-description">
            <CardHeader className="px-0 sm:px-6">
                <CardTitle className="font-headline">Product Description</CardTitle>
                <CardDescription>Create compelling descriptions for your products.</CardDescription>
            </CardHeader>
            <form onSubmit={createProductDescription} className="space-y-6 px-0 sm:px-6">
                <div className="grid gap-2">
                    <Label htmlFor="productType-pd">Product Type</Label>
                    <Select name="productType" defaultValue="Abaya">
                         <SelectTrigger id="productType-pd">
                            <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Abaya">Abaya</SelectItem>
                            <SelectItem value="Hijab">Hijab</SelectItem>
                            <SelectItem value="General Clothing">General Clothing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="keywords-pd">Keywords</Label>
                    <Textarea id="keywords-pd" name="keywords" placeholder="e.g., black silk, evening wear, silver embroidery" required rows={2} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="summary-pd">Summary (Optional)</Label>
                    <Textarea id="summary-pd" name="summary" placeholder="e.g., Inspired by starry nights, for formal events." rows={2} />
                </div>
                <div className="flex justify-end">
                    <SubmitButton pending={isLoading} text="Generate Description" />
                </div>
                <OutputCard title="Generated Product Description" content={generatedContent['productDescription']} />
            </form>
        </TabsContent>
        
        {/* SOCIAL MEDIA POST */}
        <TabsContent value="social-post">
             <CardHeader className="px-0 sm:px-6">
                <CardTitle className="font-headline">Social Media Post</CardTitle>
                <CardDescription>Draft posts for your social channels.</CardDescription>
            </CardHeader>
            <form onSubmit={createSocialMediaPost} className="space-y-6 px-0 sm:px-6">
                <div className="grid gap-2">
                    <Label htmlFor="topic-sm">Topic / Product Name</Label>
                    <Input id="topic-sm" name="topic" placeholder="e.g., Launch of the new 'Midnight Silk Abaya'" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="platform-sm">Platform</Label>
                        <Select name="platform" defaultValue="Instagram">
                             <SelectTrigger id="platform-sm">
                                <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Instagram">Instagram</SelectItem>
                                <SelectItem value="Facebook">Facebook</SelectItem>
                                <SelectItem value="X (Twitter)">X (Twitter)</SelectItem>
                                <SelectItem value="Pinterest">Pinterest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="tone-sm">Tone</Label>
                        <Select name="tone" defaultValue="Elegant">
                             <SelectTrigger id="tone-sm">
                                <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Elegant">Elegant</SelectItem>
                                <SelectItem value="Excited">Excited</SelectItem>
                                <SelectItem value="Informative">Informative</SelectItem>
                                <SelectItem value="Playful">Playful</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <SubmitButton pending={isLoading} text="Generate Post" />
                </div>
                <OutputCard title="Generated Social Media Post" content={generatedContent['socialMediaPost']} />
            </form>
        </TabsContent>

        {/* SEO META DESCRIPTION */}
        <TabsContent value="seo-meta">
             <CardHeader className="px-0 sm:px-6">
                <CardTitle className="font-headline">SEO Meta Description</CardTitle>
                <CardDescription>Optimize your products for search engines.</CardDescription>
            </CardHeader>
            <form onSubmit={createSEODescription} className="space-y-6 px-0 sm:px-6">
                <div className="grid gap-2">
                    <Label htmlFor="productName-seo">Product Name</Label>
                    <Input id="productName-seo" name="productName" placeholder="e.g., Midnight Silk Abaya" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="keywords-seo">Primary Keywords</Label>
                    <Input id="keywords-seo" name="keywords" placeholder="e.g., black silk abaya, luxury evening wear, UAE" required />
                </div>
                <div className="flex justify-end">
                    <SubmitButton pending={isLoading} text="Generate Meta Description" />
                </div>
                <OutputCard title="Generated SEO Meta Description" content={generatedContent['seoDescription']} />
            </form>
        </TabsContent>

        {/* BLOG POST IDEAS */}
        <TabsContent value="blog-ideas">
             <CardHeader className="px-0 sm:px-6">
                <CardTitle className="font-headline">Blog Post Ideas</CardTitle>
                <CardDescription>Brainstorm content to engage your audience.</CardDescription>
            </CardHeader>
            <form onSubmit={createBlogPostIdeas} className="space-y-6 px-0 sm:px-6">
                <div className="grid gap-2">
                    <Label htmlFor="topic-blog">General Topic</Label>
                    <Input id="topic-blog" name="topic" placeholder="e.g., Styling abayas for summer" required />
                </div>
                <div className="flex justify-end">
                    <SubmitButton pending={isLoading} text="Generate Ideas" />
                </div>
                <OutputCard title="Generated Blog Post Ideas" content={generatedContent['blogPostIdeas']} />
            </form>
        </TabsContent>

    </Tabs>
  );
}
