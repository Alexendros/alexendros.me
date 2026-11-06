import * as React from "react";

import { cn } from "@/lib/utils";

/* Input · Patrón axds
   - Altura mínima de tap target (--ax-tap-target / h-11) para WCAG 2.2 AA.
   - Radio --ax-radius-md, borde --ax-border-default (capa semántica: border-input).
   - Foco visible con anillo de marca (--ax-ring-focus).
   - Estado disabled consistente con el sistema. */

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "flex h-11 w-full min-w-0 rounded-[var(--ax-radius-md)] border border-[var(--ax-border-default)] bg-[var(--ax-surface-0)] px-3 py-1 text-sm text-[var(--ax-text-primary)] shadow-[var(--ax-shadow-inner-highlight)] [transition:border-color_var(--ax-duration-fast)_var(--ax-ease-out-expo),background-color_var(--ax-duration-fast)_var(--ax-ease-out-expo),box-shadow_var(--ax-duration-base)_var(--ax-ease-out-expo)] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--ax-text-primary)] placeholder:text-[var(--ax-text-tertiary)] focus-visible:[box-shadow:var(--ax-ring-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--ax-error-fg)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
