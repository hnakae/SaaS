import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:hover:bg-blue-800 dark:hover:text-blue-100 disabled:opacity-50 dark:focus:ring-blue-400 disabled:pointer-events-none dark:focus:ring-offset-blue-900 data-[state=open]:bg-blue-100 dark:data-[state=open]:bg-blue-800",
  {
    variants: {
      variant: {
        default:
          "bg-blue-900 text-white hover:bg-blue-700 dark:bg-blue-50 dark:text-blue-900",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border border-blue-200 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-100",
        subtle:
          "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100",
        ghost:
          "bg-transparent hover:bg-blue-100 dark:hover:bg-blue-800 dark:text-blue-100 dark:hover:text-blue-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-blue-900 dark:text-blue-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
