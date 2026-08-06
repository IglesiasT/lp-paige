import { Box, Stack } from '@mui/material';

/**
 * Miniatura de una landing dibujada en CSS a partir de la paleta y el copy
 * reales del cliente. Todas las medidas van en `em` y el root define el
 * `font-size`, así el mockup escala entero con el contenedor.
 *
 * Si el proyecto ya tiene captura real, `Work` renderiza la imagen en lugar
 * de este componente.
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

const SiteMockup = ({ spec }) => {
  const {
    palette: c,
    nav,
    brand,
    chip,
    headline,
    headlineAccent,
    cta,
    darkHero,
    shape,
  } = spec;

  return (
    <Box
      sx={{
        fontSize: { xs: 'clamp(6.5px, 2.1vw, 11px)', md: 'clamp(6.5px, 1vw, 10.5px)' },
        borderRadius: '1.4em',
        overflow: 'hidden',
        bgcolor: c.bg,
        border: '1px solid rgba(24,24,27,0.10)',
        boxShadow: '0 30px 60px -28px rgba(11,11,13,0.55)',
        width: '100%',
      }}
    >
      {/* ---- Barra del navegador ---- */}
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

      {/* ---- Viewport ---- */}
      <Box sx={{ aspectRatio: '16 / 11', overflow: 'hidden', bgcolor: c.bg }}>
        {/* Navbar del sitio */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            height: '3.4em',
            px: '1.7em',
            bgcolor: darkHero ? c.ink : c.surface,
            borderBottom: darkHero ? 'none' : '1px solid rgba(24,24,27,0.06)',
          }}
        >
          <Box
            sx={{
              fontSize: '1em',
              fontWeight: 700,
              letterSpacing: darkHero ? '0.12em' : '-0.01em',
              color: darkHero ? c.accent : c.accent,
              fontFamily: darkHero ? 'inherit' : '"Playfair Display", serif',
              whiteSpace: 'nowrap',
            }}
          >
            {brand}
          </Box>
          <Stack direction="row" spacing="1.2em" alignItems="center">
            {nav.map((n) => (
              <Box
                key={n}
                sx={{
                  fontSize: '0.78em',
                  color: darkHero ? 'rgba(255,255,255,0.7)' : c.muted,
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
                color: darkHero ? c.ink : '#fff',
                fontSize: '0.72em',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {cta}
            </Box>
          </Stack>
        </Stack>

        {/* Hero */}
        <Box
          sx={{
            px: '1.7em',
            py: darkHero ? '2.6em' : '2em',
            bgcolor: darkHero ? c.ink : c.bg,
            display: 'grid',
            gridTemplateColumns: shape === 'circle' ? '1.15fr 0.85fr' : '1fr',
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
                bgcolor: darkHero ? 'rgba(255,255,255,0.09)' : c.accentSoft,
                fontSize: '0.65em',
                fontWeight: 600,
                color: darkHero ? c.accentSoft : '#fff',
              }}
            >
              {chip}
            </Box>
            <Box
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: shape === 'circle' ? '2.1em' : '2.5em',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: darkHero ? '#fff' : c.ink,
                mb: '0.7em',
                maxWidth: shape === 'circle' ? 'none' : '70%',
              }}
            >
              {headline}{' '}
              <Box component="span" sx={{ color: c.accent, fontStyle: 'italic' }}>
                {headlineAccent}
              </Box>
            </Box>
            <Stack spacing="0.4em" sx={{ mb: '1.2em', maxWidth: '78%' }}>
              <Bar w="100%" c={darkHero ? '#fff' : c.muted} o={0.28} h="0.42em" />
              <Bar w="72%" c={darkHero ? '#fff' : c.muted} o={0.28} h="0.42em" />
            </Stack>
            <Stack direction="row" spacing="0.7em">
              <Box
                sx={{
                  px: '1.3em',
                  py: '0.65em',
                  borderRadius: 99,
                  bgcolor: c.accent,
                  color: darkHero ? c.ink : '#fff',
                  fontSize: '0.72em',
                  fontWeight: 600,
                }}
              >
                {cta}
              </Box>
              <Box
                sx={{
                  px: '1.3em',
                  py: '0.65em',
                  borderRadius: 99,
                  border: '1px solid',
                  borderColor: darkHero ? 'rgba(255,255,255,0.35)' : c.ink,
                  color: darkHero ? '#fff' : c.ink,
                  fontSize: '0.72em',
                  fontWeight: 600,
                }}
              >
                Conocer más
              </Box>
            </Stack>
          </Box>

          {shape === 'circle' && (
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
          )}
        </Box>

        {/* Servicios */}
        <Box
          sx={{
            px: '1.7em',
            py: '1.6em',
            bgcolor: darkHero ? c.bg : c.surface,
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
                bgcolor: darkHero ? c.surface : c.bg,
                border: '1px solid rgba(24,24,27,0.07)',
              }}
            >
              <Box
                sx={{
                  width: '1.7em',
                  height: '1.7em',
                  borderRadius: shape === 'circle' ? '50%' : '0.4em',
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

        {/* Franja de contacto oscura */}
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
              color: darkHero ? c.ink : '#fff',
              fontSize: '0.72em',
              fontWeight: 600,
            }}
          >
            Contacto
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default SiteMockup;
