import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Input } from "@/components/ui/input";

function htmlOf(node: React.ReactNode): string {
  return renderToStaticMarkup(<>{node}</>);
}

describe("Input", () => {
  it("renderiza un <input> con data-slot='input'", () => {
    const html = htmlOf(<Input placeholder="Buscar" />);
    expect(html).toContain("<input");
    expect(html).toContain('data-slot="input"');
    expect(html).toContain('placeholder="Buscar"');
  });

  it("consume exclusivamente tokens --ax-* (sin colores/spacing/radii hardcodeados)", () => {
    const html = htmlOf(<Input />);
    expect(html).toContain("var(--ax-border-default)");
    expect(html).toContain("var(--ax-surface-0)");
    expect(html).toContain("var(--ax-text-primary)");
    expect(html).toContain("var(--ax-radius-md)");
    expect(html).toContain("var(--ax-ring-focus)");
    expect(html).not.toMatch(/oklch\(/);
    expect(html).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });

  it("incluye la clase focus-visible con el anillo de marca", () => {
    const html = htmlOf(<Input />);
    expect(html).toContain("focus-visible:[box-shadow:var(--ax-ring-focus)]");
  });

  it("estado disabled: atributo y clases consistentes", () => {
    const html = htmlOf(<Input disabled />);
    expect(html).toContain("disabled");
    expect(html).toContain("disabled:opacity-50");
    expect(html).toContain("disabled:cursor-not-allowed");
    expect(html).toContain("disabled:pointer-events-none");
  });

  it("estado inválido usa token de error para el borde", () => {
    const html = htmlOf(<Input aria-invalid="true" />);
    expect(html).toContain("aria-invalid:border-[var(--ax-error-fg)]");
  });

  it("soporta type y es elemento nativo (teclado/accesibilidad nativos)", () => {
    const html = htmlOf(<Input type="search" />);
    expect(html).toContain('type="search"');
    expect(html).toContain("<input");
  });

  it("permite sobrescribir className sin perder clases base", () => {
    const html = htmlOf(<Input className="max-w-xs" />);
    expect(html).toContain("max-w-xs");
    expect(html).toContain("var(--ax-ring-focus)");
  });
});
