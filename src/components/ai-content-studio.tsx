
"use client";

import { useState, FormEvent } from 'react';
import { Bot, Loader2, Sparkles } from 'lucide-react';
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
  const [isSuggesting, setIsSuggesting] = useState<Record<string, boolean>>({});
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
      // Product Description
      pd_productType: 'Abaya',
      pd_keywords: '',
      pd_summary: '',
      // Social Media
      sm_topic: '',
      sm_platform: 'Instagram',
      sm_tone: 'Elegant',
      // SEO
      seo_productName: '',
      seo_keywords: '',
      // Blog
      blog_topic: '',
  });

  const handleInputChange = (field: keyof typeof formValues, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };
  
  const getSuggestion = async (prompt: string, field: keyof typeof formValues) => {
    setIsSuggesting(prev => ({ ...prev, [field]: true }));
    try {
        if (typeof puter === 'undefined') {
            throw new Error('Puter.js is not available.');
        }
        const result = await puter.ai.getCompletion(prompt);
        if (result) {
            handleInputChange(field, result);
        } else {
            toast({ variant: "destructive", title: "Suggestion Failed", description: "The AI could not generate a suggestion." });
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Please check the console for details.";
        toast({ variant: "destructive", title: "An unexpected error occurred.", description: errorMessage });
    } finally {
        setIsSuggesting(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleGeneration = async (event: FormEvent<HTMLFormElement>, generatorType: string, prompt: string) => {
    event.preventDefault();
    setIsLoading(true);
    setGeneratedContent(prev => ({ ...prev, [generatorType]: '' }));

    try {
      if (typeof puter === 'undefined') {
        throw new Error('Puter.js is not available.');
      }
      // Use getCompletion for unauthenticated text generation
      const result = await puter.ai.getCompletion(prompt);

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
      const { pd_keywords, pd_summary, pd_productType } = formValues;

       if (!pd_keywords) {
          toast({ variant: "destructive", title: "Keywords are required." });
          return;
        }
      
      let templatePrompt = '';
      switch (pd_productType) {
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

Generate a compelling product description for a ${pd_productType.toLowerCase()} based on the following details. It should be 2-3 paragraphs long.

${templatePrompt}

Keywords: ${pd_keywords}
Summary: ${pd_summary || 'Not provided.'}

Product Description:`;
      handleGeneration(e, 'productDescription', prompt);
  };
  
  const createSocialMediaPost = (e: FormEvent<HTMLFormElement>) => {
      const { sm_topic, sm_platform, sm_tone } = formValues;
       if (!sm_topic) {
          toast({ variant: "destructive", title: "Topic/Product is required." });
          return;
        }
      const prompt = `You are a social media manager for a luxury abaya brand, SITR.

Generate a social media post for ${sm_platform}.
The post should be about: "${sm_topic}".
The tone should be: ${sm_tone}.

Include relevant hashtags.

Generated Post:`;
      handleGeneration(e, 'socialMediaPost', prompt);
  };
  
  const createSEODescription = (e: FormEvent<HTMLFormElement>) => {
      const { seo_productName, seo_keywords } = formValues;
       if (!seo_productName || !seo_keywords) {
          toast({ variant: "destructive", title: "Product Name and Keywords are required." });
          return;
        }
      const prompt = `You are an SEO expert for an e-commerce store.

Generate a meta description for a product page. It must be a maximum of 160 characters.

Product Name: ${seo_productName}
Keywords: ${seo_keywords}

Meta Description:`;
      handleGeneration(e, 'seoDescription', prompt);
  };

  const createBlogPostIdeas = (e: FormEvent<HTMLFormElement>) => {
      const { blog_topic } = formValues;
       if (!blog_topic) {
          toast({ variant: "destructive", title: "Topic is required." });
          return;
        }
      const prompt = `You are a content strategist for a luxury fashion brand.

Generate 5 blog post ideas based on the topic: "${blog_topic}".
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
                    <Select value={formValues.pd_productType} onValueChange={(v) => handleInputChange('pd_productType', v)}>
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
                    <div className="flex justify-between items-center">
                        <Label htmlFor="keywords-pd">Keywords</Label>
                        <Button type="button" variant="link" size="sm" onClick={() => getSuggestion(`Suggest 5-7 relevant keywords for a ${formValues.pd_productType.toLowerCase()} for a luxury modest fashion brand. Return as a comma-separated list.`, 'pd_keywords')} disabled={isSuggesting['pd_keywords']}>
                            {isSuggesting['pd_keywords'] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                            Suggest
                        </Button>
                    </div>
                    <Textarea id="keywords-pd" name="keywords" placeholder="e.g., black silk, evening wear, silver embroidery" required rows={2} value={formValues.pd_keywords} onChange={(e) => handleInputChange('pd_keywords', e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="summary-pd">Summary (Optional)</Label>
                        <Button type="button" variant="link" size="sm" onClick={() => getSuggestion(`Write a 1-2 sentence summary for a ${formValues.pd_productType.toLowerCase()} with these keywords: ${formValues.pd_keywords}.`, 'pd_summary')} disabled={isSuggesting['pd_summary'] || !formValues.pd_keywords}>
                             {isSuggesting['pd_summary'] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                            Suggest
                        </Button>
                    </div>
                    <Textarea id="summary-pd" name="summary" placeholder="e.g., Inspired by starry nights, for formal events." rows={2} value={formValues.pd_summary} onChange={(e) => handleInputChange('pd_summary', e.target.value)} />
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
                     <div className="flex justify-between items-center">
                        <Label htmlFor="topic-sm">Topic / Product Name</Label>
                         <Button type="button" variant="link" size="sm" onClick={() => getSuggestion(`Suggest a creative topic for a social media post about a new luxury abaya.`, 'sm_topic')} disabled={isSuggesting['sm_topic']}>
                            {isSuggesting['sm_topic'] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                            Suggest
                        </Button>
                    </div>
                    <Input id="topic-sm" name="topic" placeholder="e.g., Launch of the new 'Midnight Silk Abaya'" required value={formValues.sm_topic} onChange={(e) => handleInputChange('sm_topic', e.target.value)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="platform-sm">Platform</Label>
                        <Select name="platform" value={formValues.sm_platform} onValueChange={(v) => handleInputChange('sm_platform', v)}>
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
                        <Select name="tone" value={formValues.sm_tone} onValueChange={(v) => handleInputChange('sm_tone', v)}>
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
                    <Input id="productName-seo" name="productName" placeholder="e.g., Midnight Silk Abaya" required value={formValues.seo_productName} onChange={(e) => handleInputChange('seo_productName', e.target.value)} />
                </div>
                <div className="grid gap-2">
                     <div className="flex justify-between items-center">
                        <Label htmlFor="keywords-seo">Primary Keywords</Label>
                        <Button type="button" variant="link" size="sm" onClick={() => getSuggestion(`Suggest 3-4 primary SEO keywords for a product named "${formValues.seo_productName}". Return as a comma-separated list.`, 'seo_keywords')} disabled={isSuggesting['seo_keywords'] || !formValues.seo_productName}>
                            {isSuggesting['seo_keywords'] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                            Suggest
                        </Button>
                    </div>
                    <Input id="keywords-seo" name="keywords" placeholder="e.g., black silk abaya, luxury evening wear, UAE" required value={formValues.seo_keywords} onChange={(e) => handleInputChange('seo_keywords', e.target.value)} />
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
                     <div className="flex justify-between items-center">
                        <Label htmlFor="topic-blog">General Topic</Label>
                        <Button type="button" variant="link" size="sm" onClick={() => getSuggestion(`Suggest an engaging blog topic related to modest fashion or abayas.`, 'blog_topic')} disabled={isSuggesting['blog_topic']}>
                            {isSuggesting['blog_topic'] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                            Suggest
                        </Button>
                    </div>
                    <Input id="topic-blog" name="topic" placeholder="e.g., Styling abayas for summer" required value={formValues.blog_topic} onChange={(e) => handleInputChange('blog_topic', e.target.value)} />
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

    