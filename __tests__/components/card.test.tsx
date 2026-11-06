import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
} from "@/components/ui/card";

function htmlOf(node: React.ReactNode): string {
  return renderToStaticMarkup(<>{node}</>);
}

describe("Card", () => {
  it("renderiza hijos y expone data-slot='card'", () => {
    const html = htmlOf(<Card>Hola tarjeta</Card>);
    expect(html).toContain('data-slot="card"');
    expect(html).toContain("Hola tarjeta");
  });

  it("consume exclusivamente tokens --ax-* (sin colores/spacing/radii hardcodeados)", () => {
    const html = htmlOf(<Card>Hola</Card>);
    expect(html).toContain("var(--ax-surface-100)");
    expect(html).toContain("var(--ax-border-subtle)");
    expect(html).toContain("var(--ax-radius-lg)");
    expect(html).toContain("var(--ax-shadow-inner-highlight)");
    expect(html).toContain("var(--ax-text-primary)");
    expect(html).not.toMatch(/oklch\(/);
    expect(html).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });

  it("incluye la clase focus-visible con el anillo de marca", () => {
    const html = htmlOf(<Card tabIndex={0}>Foco</Card>);
    expect(html).toContain("focus-visible:[box-shadow:var(--ax-ring-focus)]");
  });

  it("expone estilos de estado disabled vía data-disabled", () => {
    const html = htmlOf(<Card data-disabled="true">Deshabilitada</Card>);
    expect(html).toContain('data-disabled="true"');
    expect(html).toContain("data-[disabled=true]:opacity-50");
    expect(html).toContain("data-[disabled=true]:pointer-events-none");
  });

  it("expone estilos de estado disabled vía aria-disabled", () => {
    const html = htmlOf(<Card aria-disabled="true">Deshabilitada</Card>);
    expect(html).toContain('aria-disabled="true"');
    expect(html).toContain("aria-disabled:opacity-50");
  });

  it("renderiza subcomponentes con sus data-slot y padding px-6", () => {
    const html = htmlOf(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
          <CardDescription>Descripción</CardDescription>
          <CardAction>Acción</CardAction>
        </CardHeader>
        <CardContent>Contenido</CardContent>
        <CardFooter>Pie</CardFooter>
      </Card>,
    );
    expect(html).toContain('data-slot="card-header"');
    expect(html).toContain('data-slot="card-title"');
    expect(html).toContain('data-slot="card-description"');
    expect(html).toContain('data-slot="card-action"');
    expect(html).toContain('data-slot="card-content"');
    expect(html).toContain('data-slot="card-footer"');
    expect(html).toContain("px-6");
  });

  it("variante glass consume tokens glass", () => {
    const html = htmlOf(<Card variant="glass">Vidrio</Card>);
    expect(html).toContain("var(--ax-glass-bg)");
    expect(html).toContain("var(--ax-glass-border)");
    expect(html).toContain("var(--ax-glass-blur)");
  });

  it("size sm reduce gap y padding vertical", () => {
    const html = htmlOf(<Card size="sm">Pequeña</Card>);
    expect(html).toContain("gap-4");
    expect(html).toContain("py-4");
  });

  it("asChild permite renderizar como elemento interactivo (teclado/foco nativos)", () => {
    const html = htmlOf(
      <Card asChild>
        <button type="button">Acción de tarjeta</button>
      </Card>,
    );
    expect(html).toContain("<button");
    expect(html).toContain("Acción de tarjeta");
    expect(html).toContain('data-slot="card"');
  });

  it("cardVariants es exportable y produce clases base", () => {
    const classes = cardVariants({ variant: "default", size: "default" });
    expect(classes).toContain("var(--ax-surface-100)");
    expect(classes).toContain("var(--ax-radius-lg)");
  });
});
