import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind classes with conditional classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Define spinner variants using class-variance-authority
const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

// Define loader variants with size options
const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

// Define the Spinner component's props, extending from VariantProps for the variants
interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

// Spinner component with conditional visibility and size options
export function Spinner({ size, show, children, className }: SpinnerContentProps) {
  return (
    <span className={cn(spinnerVariants({ show }), className)}>
      <Loader2 className={cn(loaderVariants({ size }))} />
      {children}
    </span>
  );
}
