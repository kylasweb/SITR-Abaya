import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-6 h-6', props.className)}
      {...props}
    >
      <path d="M6 3l-4 18" />
      <path d="M10 3l-4 18" />
      <path d="M18 3l4 18" />
      <path d="M14 3l4 18" />
      <path d="M2 21h20" />
      <path d="M4 15h16" />
    </svg>
  );
}

export function Diamond(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('w-4 h-4', props.className)}
        {...props}
        >
        <path d="M12 2L2 12l10 10 10-10L12 2z" />
        </svg>
    )
}
