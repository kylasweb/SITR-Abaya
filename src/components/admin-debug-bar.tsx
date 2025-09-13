'use client';

import { usePathname } from 'next/navigation';
import { Badge } from './ui/badge';
import { Terminal, ChevronUp, ChevronDown, Trash2, Copy } from 'lucide-react';
import { useState } from 'react';
import { useErrorLog } from '@/hooks/use-error-log';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function AdminDebugBar() {
  const pathname = usePathname();
  const { errors, clearErrors } = useErrorLog();
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleCopy = (error: any) => {
    const errorString = `Timestamp: ${new Date(error.timestamp).toISOString()}\nMessage: ${error.message}\nStack: ${error.stack || 'N/A'}`;
    navigator.clipboard.writeText(errorString);
    toast({ title: 'Error Copied', description: 'The error details have been copied to your clipboard.' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 text-xs">
        <div 
            className="flex h-8 cursor-pointer items-center justify-between border-t border-neutral-700 bg-neutral-900 px-4 text-neutral-300"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-green-400" />
                    <span className="font-semibold text-white">Debug Bar</span>
                    {errors.length > 0 && <Badge variant="destructive">{errors.length}</Badge>}
                </div>
                
                <div className="hidden items-center gap-2 md:flex">
                    <span className="font-medium text-neutral-400">Environment:</span>
                    <Badge variant="outline" className="border-green-400/50 text-green-400">{process.env.NODE_ENV}</Badge>
                </div>
                
                <div className="hidden items-center gap-2 flex-1 lg:flex">
                    <span className="font-medium text-neutral-400">Current Path:</span>
                    <span className="font-mono text-neutral-200">{pathname}</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="hidden items-center gap-1.5 sm:flex">
                <div className={`h-2 w-2 rounded-full ${errors.length > 0 ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                <span className={errors.length > 0 ? 'text-red-400' : 'text-green-400'}>
                    {errors.length > 0 ? `${errors.length} error(s)` : 'All systems normal'}
                </span>
                </div>
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </div>
        </div>

        {isExpanded && (
            <div className="h-80 border-t-2 border-primary bg-neutral-950 p-4">
                 <Card className="h-full bg-black/30 text-neutral-200 border-neutral-700 flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between p-3">
                        <CardTitle className="text-base font-medium">Console Errors</CardTitle>
                         <Button variant="ghost" size="sm" onClick={clearErrors} disabled={errors.length === 0}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear Log
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <ScrollArea className="h-full">
                            {errors.length > 0 ? (
                                <div className="p-3 text-xs">
                                    {errors.map((error, index) => (
                                        <div key={error.timestamp + index} className="font-mono border-b border-neutral-800 py-3">
                                            <div className="flex justify-between items-start">
                                                <p className="text-red-400">{error.message}</p>
                                                <div className="flex items-center gap-2">
                                                     <span className="text-neutral-500 text-[10px]">{new Date(error.timestamp).toLocaleTimeString()}</span>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(error)}>
                                                        <Copy className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            {error.stack && (
                                                <pre className="mt-2 whitespace-pre-wrap text-neutral-400 text-[10px]">{error.stack}</pre>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                                    <p>No errors have been logged.</p>
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        )}
    </div>
  );
}
