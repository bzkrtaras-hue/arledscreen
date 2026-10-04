import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-xl text-sm font-semibold",
    "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "will-change-transform",
    "hover:-translate-y-0.5 hover:shadow-md",
    "active:translate-y-0 active:scale-[0.97] active:shadow-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-cyan text-white shadow-sm hover:bg-cyan-600 hover:shadow-glow",
        secondary:
          "bg-surface text-ink border border-border hover:border-cyan/40 hover:bg-white",
        outline:
          "border border-cyan/50 text-cyan bg-white/85 hover:bg-cyan/10 hover:border-cyan",
        ghost:
          "text-ink-soft hover:bg-cyan/8 hover:text-cyan shadow-none hover:shadow-none hover:translate-y-0",
        amber:
          "bg-amber text-white shadow-sm hover:bg-amber-600 hover:shadow-glow-amber",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
