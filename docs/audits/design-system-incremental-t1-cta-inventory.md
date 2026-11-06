# T1 — Inventario de CTAs principales y componentes ui/ candidatos

**Fecha:** 2026-11-06
**Spec:** `design.tar.gz` → `2026-11-06-design-system-incremental/` (opción A, APPROVED)
**Tarea:** T1 (gate de justificación de uso real)
**Estado:** Análisis únicamente. No se implementa ningún componente en esta tarea.

## 1. Criterio de "CTA principal"

Se considera CTA principal un elemento interactivo que cumple **al menos dos** de:

1. Aparece en una vista de primer nivel (home, error, 404) o en una sección de conversión/contacto.
2. Su etiqueta es una acción explícita del visitante (contactar, copiar, reintentar, volver, explorar principio, seguir leyendo, abrir menú/búsqueda).
3. Está estilizado como botón/píldora/FAB (no como enlace de texto ni pill de etiqueta).
4. Su ausencia o mal estado afecta directamente a la tarea principal del visitante.

Quedan **fuera** de este inventario (controles de chrome/utilidad, no CTAs):

- Enlaces inline de prosa (`brand-link`), enlaces de navegación (nav, footer, back-link), pills de etiqueta (`tag-pill`), tarjetas de artículo (`article-item`) y enlaces de archivo (`opinion-archive__title`). Son navegación, no CTAs.
- Toggles de tema/idioma/motion y el botón de volver arriba: controles de preferencia, no CTAs de conversión. Se registran aparte en §4 para trazabilidad, pero no cuentan para el 70 % de T6.

## 2. Inventario de CTAs principales

| #   | CTA                        | Ubicación                                     | Implementación actual                                   | ¿Usa `Button`? | Prioridad de adopción                                                               |
| --- | -------------------------- | --------------------------------------------- | ------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------- |
| 1   | "Contactar" (mailto)       | `components/home-content.tsx:80`              | `Button asChild` + `<a>`                                | Sí             | Ya adoptado                                                                         |
| 2   | "Sobre mí" (#biografía)    | `components/home-content.tsx:90`              | `Button variant="outline" asChild` + `<a>`              | Sí             | Ya adoptado                                                                         |
| 3   | ContactFab "Contactar"     | `components/contact-fab.tsx`                  | `Button asChild className="fab-btn"` + `<a>`            | Sí             | Migrado en T6 (preserva estilo FAB vía clase)                                       |
| 4   | CopyEmail "Copiar correo"  | `components/copy-email.tsx`                   | `Button className="fab-btn fab-btn--ghost"`             | Sí             | Migrado en T6 (preserva estilo FAB vía clase)                                       |
| 5   | Banner → alexendros.dev    | `components/anti-monetization-banner.tsx:148` | `<a className="anti-monetization-banner__link">` ad-hoc | No             | P2 — enlace píldora con estilo propio; evaluar `Button variant="outline" size="sm"` |
| 6   | "Reintentar" (error)       | `app/error.tsx:30`                            | `Button`                                                | Sí             | Ya adoptado                                                                         |
| 7   | "Volver al inicio" (error) | `app/error.tsx:31`                            | `Button variant="outline" asChild`                      | Sí             | Ya adoptado                                                                         |
| 8   | "Volver al inicio" (404)   | `app/not-found.tsx:17`                        | `Button asChild`                                        | Sí             | Ya adoptado                                                                         |

**Métrica de adopción (Tier 1):** 7 de 8 CTAs consumen `Button` → **87,5 %** (superado el 70 % de T6). Pendiente opcional: banner → alexendros.dev (#5).

### 3.1 CTAs de tarjeta (navegación a contenido, no botones)

Las tarjetas de principio (`spot-card`, 3 instancias en `components/home-content.tsx:150`) y las de "sigue leyendo" (`related`, hasta 2 instancias en `components/related-articles.tsx:35`) incluyen un CTA textual (`spot-card__cta`) pero son enlaces de tarjeta, no botones. **No se migran a `Button`** (cambiaría el patrón de tarjeta completa clicable). Se contabilizan como **excluidos** del denominador de T6.

## 3. Controles de chrome/utilidad (fuera del denominador de T6)

Registrados para trazabilidad; no son CTAs de conversión. Usan estilos propios con tokens `--ax-*` y no se migran a `Button` en esta unidad (son controles especializados):

| Control                            | Ubicación                                     | Motivo de exclusión                                       |
| ---------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| Trigger menú móvil                 | `components/mobile-menu.tsx:44`               | Ya usa `Button variant="ghost" size="icon-touch"`         |
| Trigger búsqueda (desktop)         | `components/nav.tsx:127`                      | Control de chrome; estilo `site-nav__link`                |
| Trigger búsqueda (móvil, sheet)    | `components/mobile-menu.tsx:73`               | Fila de menú, no botón destacado                          |
| Dismiss banner                     | `components/anti-monetization-banner.tsx:159` | Botón icon-only con estilo propio y animación de rotación |
| Back-to-top                        | `components/back-to-top.tsx:42`               | FAB circular con anillo de progreso CSS                   |
| Actualizar PWA (toast)             | `components/sw-register.tsx:68`               | Toast; botón primario propio (`sw-toast__btn--primary`)   |
| Descartar PWA (toast)              | `components/sw-register.tsx:75`               | Botón secundario propio                                   |
| Toggle idioma (trigger + opciones) | `components/locale-toggle.tsx:19,41`          | Control de preferencia con estado `aria-checked`          |
| Toggle tema (trigger + opciones)   | `components/theme-toggle.tsx:38,73`           | Control de preferencia con estado `aria-checked`          |
| Toggle motion                      | `components/motion-toggle.tsx:43`             | Control de preferencia icon-only                          |

## 4. Componentes `components/ui/` — inventario actual

| Componente  | Archivo                       | Uso real actual                                                                                   | Notas                                     |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `Button`    | `components/ui/button.tsx`    | `app/error.tsx`, `app/not-found.tsx`, `components/home-content.tsx`, `components/mobile-menu.tsx` | Patrón canónico cva + tokens. Base de T6. |
| `Popover`   | `components/ui/popover.tsx`   | `components/locale-toggle.tsx`, `components/theme-toggle.tsx`                                     | Wrapper Radix con tokens.                 |
| `Sheet`     | `components/ui/sheet.tsx`     | `components/mobile-menu.tsx`                                                                      | Wrapper Radix con tokens.                 |
| `Separator` | `components/ui/separator.tsx` | (sin consumidores directos detectados en `app/`/`components/`)                                    | Candidato a justificar o retirar.         |
| `Badge`     | `components/ui/badge.tsx`     | **Sin consumidores** (grep en todo el repo)                                                       | Sobre-ampliación actual. Decisión en §5.  |

## 5. Componentes candidatos (justificación de uso real)

Ordenados por prioridad. **No se implementan en T1.**

| Prioridad | Componente                                                        | ¿Existe?                              | Uso real documentado                                                                                                        | Justificación                                                                                                                                                                                       | Riesgo / notas                                                                                                  |
| --------- | ----------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| P1        | `Card`                                                            | No                                    | `spot-card` (3 principios + hasta 2 "sigue leyendo"), `opinion-featured__card`, `article-item` con superficie `surface-100` | Múltiples superficies de tarjeta con el mismo patrón (borde sutil, radio lg, elevación por superficie, inner-highlight). Mayor duplicación de patrón en el sitio.                                   | Requiere decidir si la tarjeta es clicable (Slot/asChild) o contenedor. No cambiar layouts (fuera de alcance).  |
| P2        | `Dialog`                                                          | No (se usa `DialogPrimitive` directo) | `components/search-dialog.tsx` (búsqueda global ⌘K)                                                                         | Flujo real y frecuente. Wrapper shadcn mejoraría consistencia de overlay/focus trap con el resto del sistema.                                                                                       | Migración debe mantener el auto-focus al input y la carga lazy del índice.                                      |
| P2        | `Input`                                                           | No                                    | `components/search-dialog.tsx` (input de búsqueda)                                                                          | Único campo de entrada del sitio; justificado por el flujo de búsqueda.                                                                                                                             | Un solo uso; si no se añade más, evaluar si vale la pena. Tokens exclusivos (sin hardcode).                     |
| P3        | `Toast`                                                           | No                                    | `components/sw-register.tsx` (aviso de actualización PWA)                                                                   | Un uso real pero de baja frecuencia (solo cuando hay SW nuevo).                                                                                                                                     | Considerar diferir hasta un segundo consumidor. Si se implementa, debe cubrir contraste/focus/disabled/teclado. |
| —         | `Badge` (existente)                                               | Sí, sin uso                           | Ninguno actual                                                                                                              | **No añadir más.** Opciones: (a) adoptar en pills de etiqueta (`tag-pill` en `components/article-meta.tsx` y `app/tags/page.tsx`) con justificación, o (b) retirar en una tarea de limpieza aparte. | Decisión requiere confirmación del mantenedor (afecta inventario).                                              |
| —         | Otros (Tooltip, Tabs, Accordion, Select, Switch, Skeleton, Alert) | No                                    | Ninguno                                                                                                                     | **No justificados** por uso real actual ni flujos documentados.                                                                                                                                     | Rechazados por el gate T1. Reabrir solo con un flujo documentado.                                               |

## 6. Reglas que aplican a los candidatos aprobados (T2+)

1. Consumo exclusivo de tokens `--ax-*` o de la capa semántica shadcn ya mapeada. Prohibido hardcodear color, spacing o radius.
2. Patrón cva + `cn` + tipos explícitos + export correcto, igual que `Button`.
3. Estados mínimos: `focus-visible`, `disabled`, teclado básico.
4. Tests visuales o a11y (contraste, focus-visible, disabled, teclado) por componente tocado (T3/T5).
5. `DESIGN.md` y `app/styles/tokens/` no cambian de contrato.

## 7. Siguiente paso (fuera de T1)

- T2: implementar el primer componente justificado (recomendado `Card`, P1) con cva + tokens + estados.
- T3: tests del componente de T2.
- T6: migrar al menos uno de los CTAs #3/#4/#5 a `Button` para superar el 70 %.

**No se ha implementado ningún componente en esta tarea.**
