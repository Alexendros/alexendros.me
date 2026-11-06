import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* Card · Patrón axds
   - Superficie elevada por luminosidad (surface-100 sobre surface-0), sin sombra pesada.
   - Radio --ax-radius-lg, padding vertical py-6, horizontal px-6 en subcomponentes.
   - Inner-highlight sutil (inset) para simular pixel superior iluminado.
   - Tokens exclusivos: bg-card / text-card-foreground / border-border (capa semántica shadcn → --ax-*). */

const cardVariants = cva(
  "group/card flex flex-col gap-6 rounded-[var(--ax-radius-lg)] border border-[var(--ax-border-subtle)] bg-[var(--ax-surface-100)] text-[var(--ax-text-primary)] [box-shadow:var(--ax-shadow-inner-highlight)] py-6 [transition:background-color_var(--ax-duration-fast)_var(--ax-ease-out-expo),border-color_var(--ax-duration-fast)_var(--ax-ease-out-expo),box-shadow_var(--ax-duration-base)_var(--ax-ease-out-expo)] focus-visible:[box-shadow:var(--ax-ring-focus)] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "",
        glass:
          "bg-[var(--ax-glass-bg)] border-[var(--ax-glass-border)] [backdrop-filter:var(--ax-glass-blur)]",
      },
      size: {
        default: "gap-6 py-6",
        sm: "gap-4 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Card({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="card"
      data-variant={variant}
      data-size={size}
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-[var(--ax-text-primary)] text-base font-semibold leading-none",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[var(--ax-text-secondary)] text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
};
