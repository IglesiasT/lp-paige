import { Box, Stack } from '@mui/material';

/**
 * Miniatura de una landing dibujada en CSS a partir de la paleta y el copy
 * reales del cliente. Todas las medidas van en `em` y el root define el
 * `font-size`, así el mockup escala entero con el contenedor.
 *
 * `spec.view` elige qué parte del sitio se dibuja:
 *   - 'hero'    → navbar + hero + cards de servicios + franja de contacto
 *   - 'gallery' → navbar + grilla de obras de tamaños distintos + proceso
 *
 * Dos vistas distintas evitan que los proyectos del portfolio se lean como la
 * misma página con otra paleta. Si el proyecto ya tiene captura real, `Work`
 * renderiza la imagen en lugar de este componente.
 */

const Bar = ({ w = '100%', c, o = 1, h = '0.5em' }) => (
  <Box
    sx={{
      width: w,
      height: h,
      borderRadius: 99,
      bgcolor: c,
      opacity: o,
      flexShrink: 0,
    }}
  />
);

/**
 * Marco del navegador: puntos, barra de URL y el viewport.
 *
 * El `font-size` se mide en `cqw` (ancho del contenedor), no en `vw`, para que
 * el mockup escale con la columna que lo contiene y no con la ventana. Sin eso,
 * dos mockups en columnas de distinto ancho dibujan su contenido al mismo
 * tamaño y uno queda con el interior chico. El fallback en `vw` cubre los
 * navegadores sin soporte de container queries.
 */
const Frame = ({ c, children }) => (
  <Box sx={{ containerType: 'inline-size', width: '100%' }}>
  <Box
    sx={{
      fontSize: { xs: 'clamp(6.5px, 2.1vw, 11px)', md: 'clamp(6.5px, 1vw, 10.5px)' },
      '@supports (container-type: inline-size)': {
        fontSize: 'clamp(6px, 1.8cqw, 13px)',
      },
      borderRadius: '1.4em',
      overflow: 'hidden',
      bgcolor: c.bg,
      border: '1px solid rgba(24,24,27,0.10)',
      boxShadow: '0 30px 60px -28px rgba(11,11,13,0.55)',
      width: '100%',
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      spacing="0.6em"
      sx={{
        height: '2.8em',
        px: '1.1em',
        bgcolor: 'rgba(24,24,27,0.05)',
        borderBottom: '1px solid rgba(24,24,27,0.08)',
      }}
    >
      {['#F0736A', '#F5BF4F', '#5FC66B'].map((dot) => (
        <Box
          key={dot}
          sx={{ width: '0.7em', height: '0.7em', borderRadius: '50%', bgcolor: dot }}
        />
      ))}
      <Box
        sx={{
          ml: '0.8em',
          flex: 1,
          height: '1.5em',
          borderRadius: 99,
          bgcolor: c.surface,
          border: '1px solid rgba(24,24,27,0.07)',
          display: 'flex',
          alignItems: 'center',
          px: '0.8em',
        }}
      >
        <Bar w="45%" c={c.muted} o={0.35} h="0.4em" />
      </Box>
    </Stack>

    {/* Sin aspect-ratio fijo: la altura la da el contenido, así ninguna vista
        queda con una franja de fondo vacía abajo. */}
    <Box sx={{ overflow: 'hidden', bgcolor: c.bg }}>{children}</Box>
  </Box>
  </Box>
);

/** Navbar del sitio del cliente. Compartida por las dos vistas. */
const SiteNav = ({ c, spec }) => {
  const dark = spec.darkHero;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        height: '3.4em',
        px: '1.7em',
        bgcolor: dark ? c.ink : c.surface,
        borderBottom: dark ? 'none' : '1px solid rgba(24,24,27,0.06)',
      }}
    >
      {spec.logoLines ? (
        // Logotipo apilado, como el de Goitia Metal
        <Stack spacing="0.1em" sx={{ lineHeight: 1 }}>
          <Box sx={{ fontSize: '1.05em', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
            {spec.logoLines[0]}
          </Box>
          <Box
            sx={{
              fontSize: '0.6em',
              fontWeight: 600,
              letterSpacing: '0.42em',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {spec.logoLines[1]}
          </Box>
        </Stack>
      ) : (
        <Box
          sx={{
            fontSize: '1em',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: c.accent,
            fontFamily: '"Playfair Display", serif',
            whiteSpace: 'nowrap',
          }}
        >
          {spec.brand}
        </Box>
      )}

      <Stack direction="row" spacing="1.2em" alignItems="center">
        {spec.nav.map((n) => (
          <Box
            key={n}
            sx={{
              fontSize: '0.78em',
              color:
                n === spec.navActive
                  ? c.accent
                  : dark
                    ? 'rgba(255,255,255,0.7)'
                    : c.muted,
              whiteSpace: 'nowrap',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {n}
          </Box>
        ))}
        <Box
          sx={{
            px: '1em',
            py: '0.55em',
            borderRadius: spec.ctaOutline ? '0.35em' : 99,
            border: spec.ctaOutline ? '1px solid' : 'none',
            borderColor: c.accent,
            bgcolor: spec.ctaOutline ? 'transparent' : c.accent,
            color: spec.ctaOutline ? c.accent : dark ? c.ink : '#fff',
            fontSize: '0.72em',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {spec.cta} {spec.ctaOutline && '→'}
        </Box>
      </Stack>
    </Stack>
  );
};

/** Vista 1 — la portada: hero, servicios y contacto. */
const HeroView = ({ c, spec }) => (
  <>
    <Box
      sx={{
        px: '1.7em',
        py: '2em',
        bgcolor: c.bg,
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: '1.4em',
        alignItems: 'center',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'inline-block',
            px: '0.85em',
            py: '0.4em',
            mb: '0.9em',
            borderRadius: 99,
            bgcolor: c.accentSoft,
            fontSize: '0.65em',
            fontWeight: 600,
            color: '#fff',
          }}
        >
          {spec.chip}
        </Box>
        <Box
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.1em',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: c.ink,
            mb: '0.7em',
          }}
        >
          {spec.headline}{' '}
          <Box component="span" sx={{ color: c.accent, fontStyle: 'italic' }}>
            {spec.headlineAccent}
          </Box>
        </Box>
        <Stack spacing="0.4em" sx={{ mb: '1.2em', maxWidth: '78%' }}>
          <Bar w="100%" c={c.muted} o={0.28} h="0.42em" />
          <Bar w="72%" c={c.muted} o={0.28} h="0.42em" />
        </Stack>
        <Stack direction="row" spacing="0.7em">
          <Box
            sx={{
              px: '1.3em',
              py: '0.65em',
              borderRadius: 99,
              bgcolor: c.accent,
              color: '#fff',
              fontSize: '0.72em',
              fontWeight: 600,
            }}
          >
            {spec.cta}
          </Box>
          <Box
            sx={{
              px: '1.3em',
              py: '0.65em',
              borderRadius: 99,
              border: '1px solid',
              borderColor: c.ink,
              color: c.ink,
              fontSize: '0.72em',
              fontWeight: 600,
            }}
          >
            Conocer más
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          justifySelf: 'center',
          width: '8.2em',
          height: '8.2em',
          borderRadius: '50%',
          background: `linear-gradient(150deg, ${c.accentSoft}, ${c.accent})`,
          boxShadow: `0 1.2em 2.4em -0.8em ${c.accent}80`,
        }}
      />
    </Box>

    <Box
      sx={{
        px: '1.7em',
        py: '1.6em',
        bgcolor: c.surface,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.9em',
      }}
    >
      {[0, 1, 2].map((i) => (
        <Stack
          key={i}
          spacing="0.5em"
          sx={{
            p: '0.9em',
            borderRadius: '0.8em',
            bgcolor: c.bg,
            border: '1px solid rgba(24,24,27,0.07)',
          }}
        >
          <Box
            sx={{
              width: '1.7em',
              height: '1.7em',
              borderRadius: '50%',
              bgcolor: c.accent,
              opacity: 0.9 - i * 0.15,
              mb: '0.2em',
            }}
          />
          <Bar w="70%" c={c.ink} o={0.8} h="0.45em" />
          <Bar w="100%" c={c.muted} o={0.3} h="0.35em" />
          <Bar w="85%" c={c.muted} o={0.3} h="0.35em" />
        </Stack>
      ))}
    </Box>

    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ bgcolor: c.ink, px: '1.7em', py: '1.3em' }}
    >
      <Stack spacing="0.4em" sx={{ width: '45%' }}>
        <Bar w="55%" c="#fff" o={0.85} h="0.55em" />
        <Bar w="85%" c="#fff" o={0.3} h="0.38em" />
      </Stack>
      <Box
        sx={{
          px: '1.3em',
          py: '0.65em',
          borderRadius: 99,
          bgcolor: c.accent,
          color: '#fff',
          fontSize: '0.72em',
          fontWeight: 600,
        }}
      >
        Contacto
      </Box>
    </Stack>
  </>
);

// Tonos que imitan las fotos de obra reales: metal, vidrio, madera, hormigón
// y ladrillo. Sin esto la grilla se lee como bloques grises.
const PHOTO_TONES = [
  ['#3C3C39', '#121211'],
  ['#465560', '#13171A'],
  ['#6B5236', '#241C13'],
  ['#5A5A55', '#232320'],
  ['#7A4A3A', '#2A1913'],
];

const Photo = ({ i, flex }) => {
  const [from, to] = PHOTO_TONES[i % PHOTO_TONES.length];
  return (
    <Box
      sx={{
        flex,
        borderRadius: '0.2em',
        background: `linear-gradient(${130 + (i % 4) * 22}deg, ${from} 0%, ${to} 100%)`,
      }}
    />
  );
};

/**
 * Vista 2 — la sección Trabajos del sitio real de Goitia Metal.
 * Mosaico denso de obra sobre negro (5 arriba, 4 abajo) más la franja de
 * proceso. Reproduce `lp-goitiametal/mockup.jpeg`.
 */
const GalleryView = ({ c, spec }) => {
  // Anchos desparejos: es lo que hace que se lea como un mosaico de fotos y
  // no como una grilla de cards.
  const row1 = [1.05, 1.15, 0.95, 0.95, 1];
  const row2 = [1, 1.1, 1, 1.6];

  return (
    <>
      <Box sx={{ bgcolor: c.ink, px: '1.7em', pt: '1.7em', pb: '1.5em' }}>
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          sx={{ mb: '1.3em', gap: '1em' }}
        >
          <Box>
            <Box
              sx={{
                fontSize: '0.56em',
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: c.accent,
                mb: '0.8em',
              }}
            >
              {spec.sectionOverline}
            </Box>
            <Box
              sx={{
                fontSize: '1.55em',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#fff',
              }}
            >
              {spec.sectionTitle}
            </Box>
          </Box>

          <Box
            sx={{
              px: '1em',
              py: '0.55em',
              borderRadius: '0.35em',
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#fff',
              fontSize: '0.66em',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {spec.galleryCta} →
          </Box>
        </Stack>

        <Stack spacing="0.45em">
          <Stack direction="row" spacing="0.45em" sx={{ height: '5.2em' }}>
            {row1.map((flex, i) => (
              <Photo key={i} i={i} flex={flex} />
            ))}
          </Stack>
          <Stack direction="row" spacing="0.45em" sx={{ height: '5.2em' }}>
            {row2.map((flex, i) => (
              <Photo key={i} i={i + 3} flex={flex} />
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* Arranque de la sección de proceso, cortada por el borde */}
      <Box sx={{ bgcolor: c.bg, px: '1.7em', pt: '1.6em', pb: '1.7em' }}>
        <Box
          sx={{
            fontSize: '0.56em',
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: c.accent,
            mb: '0.7em',
          }}
        >
          {spec.processOverline}
        </Box>
        <Box
          sx={{
            fontSize: '1.35em',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: c.ink,
            mb: '1.3em',
          }}
        >
          {spec.processTitle}
        </Box>

        <Stack direction="row" alignItems="flex-start" sx={{ gap: '0.9em' }}>
          {spec.steps.map((step, i) => (
            <Stack key={step} direction="row" sx={{ flex: 1, gap: '0.6em' }}>
              <Stack spacing="0.35em" sx={{ flex: 1 }}>
                <Box
                  sx={{
                    fontSize: '1.15em',
                    fontWeight: 400,
                    color: c.muted,
                    opacity: 0.55,
                    lineHeight: 1,
                  }}
                >
                  0{i + 1}
                </Box>
                <Box sx={{ fontSize: '0.68em', fontWeight: 700, color: c.ink }}>
                  {step}
                </Box>
                <Bar w="100%" c={c.muted} o={0.32} h="0.3em" />
                <Bar w="75%" c={c.muted} o={0.32} h="0.3em" />
              </Stack>
              {i < spec.steps.length - 1 && (
                <Box
                  sx={{
                    fontSize: '0.9em',
                    color: c.muted,
                    opacity: 0.4,
                    alignSelf: 'center',
                  }}
                >
                  ›
                </Box>
              )}
            </Stack>
          ))}
        </Stack>
      </Box>
    </>
  );
};

const SiteMockup = ({ spec }) => {
  const c = spec.palette;
  return (
    <Frame c={c}>
      <SiteNav c={c} spec={spec} />
      {spec.view === 'gallery' ? (
        <GalleryView c={c} spec={spec} />
      ) : (
        <HeroView c={c} spec={spec} />
      )}
    </Frame>
  );
};

export default SiteMockup;
