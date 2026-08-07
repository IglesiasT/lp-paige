# Paige — Marca

Fuente de verdad de la identidad de Paige. Si algo acá difiere de `src/theme.js`,
de `paige_brand_identity.html` o de cualquier otro lado, **manda este archivo**.

Esto aplica **solo a la landing de Paige** (`lp-paige`). Las landings de clientes
usan sus propias paletas y tipografías; ver `CLAUDE.md` en la carpeta padre.

---

## Identidad

| | |
|---|---|
| Nombre | Paige |
| Qué es | Agencia unipersonal de landing pages para pymes |
| Tagline en uso | *Tu negocio, en línea.* |

**Qué vendemos**: velocidad, que quede andando, y que el cliente no tenga que
tocar nada. **No** vendemos diseño ni desarrollo a medida — ver
[Qué no decimos](#qué-no-decimos).

### Taglines candidatas

- Tu negocio, en línea. — *directo, sin rodeos* ← en uso
- La página que tu negocio necesitaba. — *enfocado en el cliente* ← titular del hero
- Primera impresión, para siempre. — *aspiracional*
- Pages that work. — *en inglés, si algún día escala*

---

## Logo

El logotipo es la palabra **paige** en minúscula, en serif, con una cuña
terracota como remate.

| Uso | Dónde vive |
|---|---|
| En la web | `src/components/Wordmark.jsx` — se dibuja con tipografía, hereda el color del contexto |
| Archivo suelto | `public/logo.svg` — para favicon, OG image, firma de mails, documentos |
| Ícono | `public/favicon.svg` — cuadrado ink con la `p` y la esquina doblada terracota |

El `Wordmark` en la web usa **Playfair Display**; el SVG suelto usa Georgia como
fallback para que se vea igual sin cargar fuentes. Son intencionalmente parecidos,
no idénticos.

**Nunca**: estirarlo, ponerlo en mayúsculas, cambiarle el color de la cuña, ni
apoyarlo sobre un fondo que no sea Ink, Paper o Sand.

---

## Paleta

### Colores base

| Nombre | Hex | Uso |
|---|---|---|
| Ink | `#18181B` | Texto principal, botones primarios, fondos oscuros |
| Ink claro | `#3F3F46` | Hover de Ink, wireframes |
| Terracota | `#C8956C` | **Único color de acento.** CTAs, overlines, detalles |
| Terracota suave | `#E2BFA3` | Hover de Terracota, degradados |
| Paper | `#FAFAF5` | Fondo de las secciones claras |
| Blanco | `#FFFFFF` | Cards sobre Paper |
| Sand | `#E8E4DC` | Fondo de secciones alternas, chips |
| Slate | `#71717A` | Texto secundario |

### Tokens de sección oscura

Introducidos con el rediseño de la landing propia. Son lo que le da el aire de
estudio y no existen en el template de clientes.

| Nombre | Valor | Uso |
|---|---|---|
| `darkDeep` | `#0B0B0D` | Fondo de hero, servicios, contacto y footer |
| `darkElevated` | `#141418` | Cards sobre fondo oscuro |
| `onDark` | `#F4F1EA` | Texto sobre oscuro (no blanco puro) |
| `onDarkMuted` | `rgba(244, 241, 234, 0.60)` | Texto secundario sobre oscuro |
| `borderDark` | `rgba(244, 241, 234, 0.12)` | Bordes y grillas sobre oscuro |

**Regla del acento**: un solo color de acento, terracota. Si algo necesita
destacarse y ya hay terracota cerca, se resuelve con jerarquía tipográfica o
espacio, no con otro color.

---

## Tipografía

Tres familias, tres roles. Se cargan desde Google Fonts en `index.html`.

| Familia | Rol | Dónde |
|---|---|---|
| **Playfair Display** | Títulos | `h1`–`h4`, números grandes, logotipo |
| **Inter** | Cuerpo | Párrafos, botones, navegación, `h5`–`h6` |
| **JetBrains Mono** | Etiquetas técnicas | Overlines, numeración (`01`, `02`), tags, año, metadatos |

El mono es lo que más diferencia a Paige de las landings de clientes. Va siempre
en tamaño chico, con `letter-spacing` amplio y casi siempre en mayúsculas.

### Detalles

- Playfair va en **peso 400**, nunca bold. En títulos grandes se le aplica
  `letter-spacing: -0.02em` para cerrarlo.
- La palabra acentuada del titular va en **itálica y terracota**.
- Overlines: mono, `0.7rem`, `letter-spacing: 0.18em`, mayúsculas.
- Botones: sin mayúsculas, peso 600.

---

## Formas y movimiento

| | |
|---|---|
| Radio base | `16px` (`theme.shape.borderRadius`) |
| Cards y paneles | `16px`–`32px` |
| Botones y chips | **Píldora** (`999px`) |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` para todo lo que se mueve |
| Duración | 250ms interacciones · 400–700ms apariciones al scroll |
| Sombras | Difusas y muy suaves. Nada duro ni con offset marcado |

Todo movimiento se apaga con `prefers-reduced-motion: reduce`.

---

## Tono de voz

**directo · sin tecnicismos · cercano · confiable · sin sobre-vender**

- **Siempre en plural.** "Nos ocupamos", "diseñamos", "contanos". Aunque Paige
  sea una sola persona, el plural da respaldo frente a quien está eligiendo entre
  una agencia y un freelance. Nunca en singular.
- Voseo argentino. "Contanos", "vos seguí con tu negocio".
- Frases cortas. Si una oración necesita una coma para respirar, va punto.
- Nombrar el dolor, no la tecnología. No es "un módulo de presupuestos", es
  "dejar de perder media hora armando cada presupuesto".
- **Velocidad sin número.** Se enfatiza que es rápido, no se fija un plazo
  exacto: "en días, no en meses" sí; "en 7 días" no. Un número en el sitio se
  convierte en una expectativa que hay que cumplir en todos los casos.

### Qué no decimos

Reglas que salen de lo que Paige realmente es. Romperlas genera promesas que no
se pueden sostener:

| No | Por qué |
|---|---|
| "Diseñamos" | Paige no tiene diseñador. Se trabaja sobre un sistema propio. |
| "Hecho a medida", "sin plantillas" | Es falso: hay un template y presets. Y se nota al comparar dos sitios. |
| "Software a medida" abierto | Compromete un alcance infinito. Se ofrecen módulos concretos. |
| Métricas inventadas | Nada de "+300% de conversión" ni cifras de clientes que no existen. |
| Jerga: ERP, CRM, stack, deploy | El cliente no sabe qué son. Traducir siempre al problema. |

---

## Archivos relacionados

| Archivo | Qué es |
|---|---|
| `src/theme.js` | Implementación en MUI de todo lo de acá |
| `src/config.js` | Paleta y textos de esta landing |
| `paige_brand_identity.html` | Tablero visual, para mostrar. Derivado de este archivo |
| `../CLAUDE.md` | Reglas que aplican a **todos** los proyectos, clientes incluidos |
