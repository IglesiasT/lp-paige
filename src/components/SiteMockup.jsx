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
      <Box
        sx={{
          fontSize: '1em',
          fontWeight: 700,
          letterSpacing: dark ? '0.12em' : '-0.01em',
          color: c.accent,
          fontFamily: dark ? 'inherit' : '"Playfair Display", serif',
          whiteSpace: 'nowrap',
        }}
      >
        {spec.brand}
      </Box>
      <Stack direction="row" spacing="1.2em" alignItems="center">
        {spec.nav.map((n) => (
          <Box
            key={n}
            sx={{
              fontSize: '0.78em',
              color: dark ? 'rgba(255,255,255,0.7)' : c.muted,
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
            py: '0.5em',
            borderRadius: 99,
            bgcolor: c.accent,
            color: dark ? c.ink : '#fff',
            fontSize: '0.72em',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {spec.cta}
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

/**
 * Vista 2 — la galería de obras. Grilla asimétrica de cuatro piezas y una
 * franja de proceso: nada que ver con las tres cards iguales de HeroView.
 */
const GalleryView = ({ c, spec }) => {
  // Cada tile ocupa un lugar distinto de una grilla de 4×2.
  const areas = [
    { col: 'span 2', row: 'span 2' },
    { col: 'span 2', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
    { col: 'span 1', row: 'span 1' },
  ];

  return (
    <>
      <Box sx={{ px: '1.7em', pt: '1.5em', pb: '1.1em', bgcolor: c.bg }}>
        <Box
          sx={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.58em',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: c.accent,
            mb: '0.7em',
          }}
        >
          {spec.sectionOverline}
        </Box>
        <Box
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.6em',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: c.ink,
            maxWidth: '75%',
          }}
        >
          {spec.sectionTitle}
        </Box>
      </Box>

      <Box
        sx={{
          px: '1.7em',
          bgcolor: c.bg,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '5.4em',
          gap: '0.7em',
        }}
      >
        {spec.tiles.map((tile, i) => (
          <Box
            key={tile}
            sx={{
              gridColumn: areas[i].col,
              gridRow: areas[i].row,
              borderRadius: '0.7em',
              overflow: 'hidden',
              position: 'relative',
              // Simula una foto de obra: degradado metálico con reflejo bronce
              background: `linear-gradient(${145 + i * 25}deg, ${c.ink} 0%, #4A4A4A 55%, ${c.accentSoft}55 100%)`,
              display: 'flex',
              alignItems: 'flex-end',
              p: '0.7em',
            }}
          >
            <Box
              sx={{
                fontSize: '0.62em',
                fontWeight: 600,
                color: '#fff',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              {tile}
            </Box>
          </Box>
        ))}
      </Box>

      <Stack
        direction="row"
        sx={{
          mt: '1.5em',
          bgcolor: c.ink,
          px: '1.7em',
          py: '1.3em',
          gap: '1.4em',
        }}
      >
        {spec.steps.map((step, i) => (
          <Stack key={step} spacing="0.45em" sx={{ flex: 1 }}>
            <Box
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.55em',
                letterSpacing: '0.14em',
                color: c.accent,
              }}
            >
              0{i + 1}
            </Box>
            <Box sx={{ fontSize: '0.68em', fontWeight: 600, color: '#fff' }}>
              {step}
            </Box>
            <Bar w="80%" c="#fff" o={0.25} h="0.3em" />
          </Stack>
        ))}
      </Stack>
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
