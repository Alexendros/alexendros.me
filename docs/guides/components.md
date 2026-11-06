# Guía: componentes `components/ui/`

### Propósito

Referencia localizable de uso de los componentes del design system (modelo
shadcn con ownership local). Complementa `DESIGN.md` (tokens y principios) y
`STYLEGUIDE.md` (convenciones).

## Reglas de uso

1. Todo componente nuevo o modificado consume exclusivamente tokens `--ax-*`
   o la capa semántica shadcn ya mapeada (`bg-card`, `text-foreground`, …).
   Prohibido hardcodear colores, spacing o radii.
2. Patrón: `cva` + `cn` + props tipadas + export nombrado. Sin runtime
   component libraries.
3. Estados mínimos: `focus-visible`, `disabled`, teclado básico.
4. Tests en `__tests__/components/<componente>.test.tsx`.

## Componentes disponibles

### `Button` (`components/ui/button.tsx`)

Variantes: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.
Tamaños: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`,
`touch`, `icon-touch`.

```tsx
import { Button } from "@/components/ui/button";

<Button>Acción principal</Button>
<Button variant="outline" asChild>
  <a href="#seccion">Ir a sección</a>
</Button>
```

- `asChild` permite renderizar como enlace u otro elemento manteniendo estilos
  y estados.
- Adoptado en CTAs principales (ver `docs/audits/design-system-incremental-t1-cta-inventory.md`).

### `Card` (`components/ui/card.tsx`)

Subcomponentes: `Card`, `CardHeader`, `CardTitle`, `CardDescription`,
`CardAction`, `CardContent`, `CardFooter`.

Variantes: `default`, `glass`. Tamaños: `default`, `sm`.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>Contenido</CardContent>
  <CardFooter>Pie</CardFooter>
</Card>;
```

- Elevación por luminosidad (`--ax-surface-100` sobre `--ax-surface-0`), sin
  sombra pesada (solo inner-highlight).
- `asChild` permite envolver un elemento interactivo (p. ej. un enlace de
  tarjeta) conservando los estilos del sistema.

### `Input` (`components/ui/input.tsx`)

Variantes de tamaño vía cva: `default` (h-11), `sm` (h-9).

```tsx
import { Input } from "@/components/ui/input";

<Input type="search" placeholder="Buscar…" aria-label="Buscar" />
<Input size="sm" type="text" aria-label="Filtro" />
```

- Altura mínima de tap target (`h-11` en `default`).
- Estados `focus-visible` (anillo de marca) y `disabled` consistentes.
- Validación visual con `aria-invalid` (borde `--ax-error-fg`).

## Componentes existentes

- `Popover` (`components/ui/popover.tsx`): `PopoverRoot`, `PopoverTrigger`,
  `PopoverContent`.
- `Sheet` (`components/ui/sheet.tsx`): `Sheet`, `SheetContent`,
  `SheetTrigger`.
- `Separator` (`components/ui/separator.tsx`).
- `Badge` (`components/ui/badge.tsx`): sin consumidores actuales.
  **Decisión (2026-11-06): opción B** — se mantiene hasta una unidad de
  limpieza (owner: Mantenedor/Alexendros, fecha objetivo ≤ 2026-12-01). No
  usar en nuevas vistas hasta entonces.

## Candidatos aprobados (no implementados aún)

- `Dialog` (búsqueda global).
- `Toast` (aviso PWA), condicional a un segundo consumidor.

## Cuándo usar Card vs superficies ad-hoc

- Usa `Card` para contenedores genéricos reutilizables (listados, paneles,
  bloques de contenido) que no necesiten animaciones especiales.
- Mantén `spot-card`, `opinion-featured__card` y `article-item` mientras
  conserven su foco de luz e inner-highlight propios; su migración a `Card`
  es opcional y fuera de esta unidad (no rediseñar layouts).
- Regla: si una superficie necesita `trackPointer` o animación dedicada,
  mantén la clase ad-hoc; en caso contrario, prefiere `Card`.

## Cuándo usar Input

- Único campo de entrada actual: búsqueda global (`search-dialog`).
- Para nuevos formularios o filtros, usar `Input` en lugar de `<input>` suelto.
- Validación visual con `aria-invalid` (borde `--ax-error-fg`).

## Regla de oro

- Solo tokens `--ax-*` o capa semántica shadcn (`bg-card`, `text-foreground`, …).
  Prohibido hardcodear colores, spacing o radii.
- Estados mínimos exigidos en todo componente tocado: `focus-visible`,
  `disabled` y, en Input, `aria-invalid`.

Ver inventario completo en
`docs/audits/design-system-incremental-t1-cta-inventory.md`.
