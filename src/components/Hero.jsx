import { Fragment, lazy, Suspense } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { keyframes } from '@emotion/react';
import { config } from '../config.js';
import { buildWhatsAppUrl } from '../utils/links.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import ErrorBoundary from './ErrorBoundary.jsx';

// El bundle de three.js se carga aparte: el texto del hero pinta primero.
const HeroScene = lazy(() => import('./three/HeroScene.jsx'));

const p = config.palette;

const riseIn = keyframes`
  from { transform: translate3d(0, 110%, 0); }
  to   { transform: translate3d(0, 0, 0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(6px); }
`;

/**
 * Título que sube palabra por palabra desde detrás de una máscara.
 * Entre palabra y palabra va un espacio real (no un margen) para que el
 * titular se copie, se indexe y se lea bien en un lector de pantalla.
 */
const Words = ({ text, accent = false, startDelay = 0, reduced }) => (
  <>
    {text.split(' ').map((word, i) => (
      <Fragment key={`${word}-${i}`}>
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            // Aire para que la máscara no corte los descendentes (p, g, q)
            pb: '0.18em',
            mb: '-0.18em',
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              color: accent ? 'secondary.main' : p.onDark,
              fontStyle: accent ? 'italic' : 'normal',
              animation: reduced
                ? 'none'
                : `${riseIn} 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${startDelay + i * 70}ms both`,
            }}
          >
            {word}
          </Box>
        </Box>{' '}
      </Fragment>
    ))}
  </>
);

const Hero = () => {
  const reduced = usePrefersReducedMotion();
  const waUrl = buildWhatsAppUrl(
    config.contact.whatsapp,
    config.contact.whatsappMessage,
  );

  const accentDelay = 70 * config.hero.headline.split(' ').length;

  // Placeholder mientras carga three.js (o si WebGL no está disponible).
  const sceneFallback = (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: 180, md: 280 },
          height: { xs: 180, md: 280 },
          borderRadius: '50%',
          background: `radial-gradient(circle at 32% 28%, ${p.secondaryLight}, ${p.secondary} 45%, #7A5537 100%)`,
          filter: 'blur(0.5px)',
          opacity: 0.9,
        }}
      />
    </Box>
  );

  return (
    <Box
      id="top"
      component="section"
      sx={{
        position: 'relative',
        bgcolor: p.darkDeep,
        color: p.onDark,
        overflow: 'hidden',
        minHeight: { xs: 'auto', md: '100svh' },
        display: 'flex',
        alignItems: 'center',
        // El padding superior tiene que despejar la navbar flotante, que es
        // fixed y no ocupa espacio en el flujo.
        pt: { xs: 15, md: 18 },
        pb: { xs: 8, md: 12 },
      }}
    >
      {/* Grilla técnica de fondo */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${p.borderDark} 1px, transparent 1px), linear-gradient(90deg, ${p.borderDark} 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)',
          opacity: 0.5,
        }}
      />
      {/* Halos de color */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${p.secondary}33 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '-15%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #2A3A4D55 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 2, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* ---------- Columna de texto ---------- */}
          <Box sx={{ order: { xs: 2, md: 1 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.9rem', sm: '3.6rem', md: '4.2rem', lg: '4.9rem' },
                mb: 3.5,
                maxWidth: 680,
              }}
            >
              <Words text={config.hero.headline} reduced={reduced} />
              <Words
                text={config.hero.headlineAccent}
                accent
                startDelay={accentDelay}
                reduced={reduced}
              />
            </Typography>

            <Typography
              sx={{
                color: p.onDarkMuted,
                fontSize: { xs: '1.02rem', md: '1.12rem' },
                lineHeight: 1.75,
                mb: 4.5,
                maxWidth: 520,
                animation: reduced ? 'none' : `${fadeUp} 0.8s ease 0.5s both`,
              }}
            >
              {config.hero.subtitle}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{
                mb: 6,
                animation: reduced ? 'none' : `${fadeUp} 0.8s ease 0.65s both`,
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="secondary"
                href={waUrl}
                target="_blank"
                rel="noopener"
              >
                {config.hero.primaryCta}
              </Button>
              <Button
                size="large"
                variant="outlined"
                href="#trabajos"
                sx={{
                  borderColor: p.borderDark,
                  color: p.onDark,
                  '&:hover': {
                    borderColor: p.onDark,
                    bgcolor: 'rgba(244, 241, 234, 0.06)',
                  },
                }}
              >
                {config.hero.secondaryCta}
              </Button>
            </Stack>

            {/* Datos duros del servicio */}
            <Stack
              direction="row"
              sx={{
                gap: { xs: 3, sm: 5 },
                flexWrap: 'wrap',
                animation: reduced ? 'none' : `${fadeUp} 0.8s ease 0.8s both`,
              }}
            >
              {config.hero.facts.map((fact) => (
                <Box key={fact.label}>
                  <Typography
                    component="p"
                    sx={{
                      fontFamily: (t) => t.typography.fontFamilyHeading,
                      fontSize: { xs: '1.9rem', md: '2.2rem' },
                      lineHeight: 1,
                      color: p.onDark,
                    }}
                  >
                    {fact.value}
                    <Box
                      component="span"
                      sx={{
                        fontFamily: (t) => t.typography.fontFamilyMono,
                        fontSize: '0.7rem',
                        color: 'secondary.main',
                        ml: 0.75,
                        letterSpacing: '0.08em',
                      }}
                    >
                      {fact.unit}
                    </Box>
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.75,
                      fontSize: '0.8rem',
                      color: p.onDarkMuted,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {fact.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* ---------- Columna 3D ---------- */}
          <Box
            sx={{
              order: { xs: 1, md: 2 },
              position: 'relative',
              height: { xs: 300, sm: 380, md: 560 },
              mx: { xs: -2, md: 0 },
            }}
          >
            {reduced ? (
              sceneFallback
            ) : (
              <ErrorBoundary fallback={sceneFallback}>
                <Suspense fallback={sceneFallback}>
                  <HeroScene />
                </Suspense>
              </ErrorBoundary>
            )}
          </Box>
        </Box>
      </Container>

      {/* Indicador de scroll */}
      <Stack
        aria-hidden
        alignItems="center"
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: { xs: 'none', md: 'flex' },
          animation: reduced ? 'none' : `${fadeUp} 1s ease 1.2s both`,
        }}
      >
        <ArrowDownwardIcon
          sx={{
            fontSize: 18,
            color: 'secondary.main',
            animation: reduced ? 'none' : `${bob} 2s ease-in-out infinite`,
          }}
        />
      </Stack>
    </Box>
  );
};

export default Hero;
