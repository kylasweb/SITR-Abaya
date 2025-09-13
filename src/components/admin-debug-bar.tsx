'use client';

import { usePathname } from 'next/navigation';
import { Badge } from './ui/badge';
import { Terminal } from 'lucide-react';

export default function AdminDebugBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-neutral-900 text-neutral-300 flex items-center px-4 z-50 text-xs border-t border-neutral-700">
        <div className="flex items-center gap-6 w-full">
            <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-green-400" />
                <span className="font-semibold text-white">Debug Bar</span>
            </div>
            
            <div className="flex items-center gap-2">
                <span className="font-medium text-neutral-400">Environment:</span>
                <Badge variant="outline" className="text-green-400 border-green-400/50">{process.env.NODE_ENV}</Badge>
            </div>
            
            <div className="flex items-center gap-2 flex-1">
                 <span className="font-medium text-neutral-400">Current Path:</span>
                <span className="font-mono text-neutral-200">{pathname}</span>
            </div>

            <div className="flex items-center gap-2">
                 <span className="font-medium text-neutral-400">Status:</span>
                 <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-green-400">All systems normal</span>
                 </div>
            </div>
        </div>
    </div>
  );
}
