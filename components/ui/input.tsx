import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* Input · Patrón axds
   - Altura mínima de tap target (--ax-tap-target / h-11) para WCAG 2.2 AA.
   - Radio --ax-radius-md, borde --ax-border-default (capa semántica: border-input).
   - Foco visible con anillo de marca (--ax-ring-focus).
   - Estado disabled consistente con el sistema.
   - Variantes de tamaño vía cva, alineadas con Button. */

const inputVariants = cva(
  "flex w-full min-w-0 rounded-[var(--ax-radius-md)] border border-[var(--ax-border-default)] bg-[var(--ax-surface-0)] text-[var(--ax-text-primary)] shadow-[var(--ax-shadow-inner-highlight)] outline-none [transition:border-color_var(--ax-duration-fast)_var(--ax-ease-out-expo),background-color_var(--ax-duration-fast)_var(--ax-ease-out-expo),box-shadow_var(--ax-duration-base)_var(--ax-ease-out-expo)] file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-[var(--ax-text-primary)] placeholder:text-[var(--ax-text-tertiary)] focus-visible:[box-shadow:var(--ax-ring-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--ax-error-fg)]",
  {
    variants: {
      size: {
        default: "h-11 px-3 py-1 text-sm file:h-7 file:text-sm",
        sm: "h-9 px-2.5 py-1 text-sm file:h-7 file:text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        data-size={size ?? "default"}
        className={cn(inputVariants({ size, className }))}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
