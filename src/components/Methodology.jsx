import { memo } from 'react';
import { Box, Container, Typography, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { config } from '../config.js';
import { useSectionProgress } from '../hooks/useSectionProgress.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import BuildMockup from './BuildMockup.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const p = config.palette;
const steps = config.methodology.steps;

// Punto de scroll en el que cada paso pasa a estar activo. Coincide con las
// fases del mockup: brief → wireframe → diseño → publicado.
const THRESHOLDS = [0, 0.24, 0.52, 0.78];

// Memoizado: el progreso cambia en cada frame de scroll, pero un paso solo se
// redibuja cuando pasa a estar activo o deja de estarlo.
const StepItem = memo(({ step, active }) => (
  <Stack
    direction="row"
    spacing={{ xs: 2, md: 3 }}
    sx={{
      opacity: active ? 1 : 0.32,
      transition: 'opacity 0.5s ease',
    }}
  >
    <Typography
      sx={{
        fontFamily: (t) => t.typography.fontFamilyMono,
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        color: active ? 'secondary.main' : 'text.secondary',
        pt: 0.75,
        transition: 'color 0.5s ease',
        flexShrink: 0,
      }}
    >
      {step.number}
    </Typography>

    <Box>
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: '1.3rem', md: '1.45rem' },
          mb: 0.75,
          color: 'text.primary',
        }}
      >
        {step.label}
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          maxWidth: 420,
        }}
      >
        {step.description}
      </Typography>
      <Typography
        sx={{
          mt: 1,
          fontFamily: (t) => t.typography.fontFamilyMono,
          fontSize: '0.68rem',
          letterSpacing: '0.06em',
          color: 'secondary.main',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(-4px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        → {step.note}
      </Typography>
    </Box>
  </Stack>
));

StepItem.displayName = 'StepItem';

const Methodology = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const reduced = usePrefersReducedMotion();
  const [ref, progress] = useSectionProgress();

  // En mobile (o con movimiento reducido) el scroll narrativo se vuelve
  // incómodo: mostramos la página ya armada y los pasos apilados.
  const staticMode = isMobile || reduced;
  const t = staticMode ? 1 : progress;
  const activeIndex = THRESHOLDS.reduce(
    (acc, threshold, i) => (t >= threshold ? i : acc),
    0,
  );

  const heading = (
    <SectionHeading
      overline={config.methodology.overline}
      title={config.methodology.title}
      subtitle={config.methodology.subtitle}
      maxWidth={560}
      titleSize={{ xs: '2.1rem', sm: '2.4rem', md: '2.6rem' }}
    />
  );

  // ---------- Versión apilada ----------
  if (staticMode) {
    return (
      <Box
        id="metodologia"
        component="section"
        sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.default' }}
      >
        <Container maxWidth="lg">
          {heading}
          <Reveal sx={{ mt: 6 }}>
            <BuildMockup t={1} />
          </Reveal>
          <Stack spacing={5} sx={{ mt: 7 }}>
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <StepItem step={step} active />
              </Reveal>
            ))}
          </Stack>
        </Container>
      </Box>
    );
  }

  // ---------- Versión con scroll narrativo ----------
  return (
    <Box
      id="metodologia"
      component="section"
      ref={ref}
      sx={{ height: '440vh', bgcolor: 'background.default', position: 'relative' }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '0.92fr 1.08fr',
              gap: 8,
              alignItems: 'center',
            }}
          >
            {/* Columna de pasos */}
            <Box>
              {heading}

              <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
                {/* Riel de progreso */}
                <Box
                  aria-hidden
                  sx={{
                    width: 2,
                    borderRadius: 99,
                    bgcolor: 'divider',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: `${t * 100}%`,
                      bgcolor: 'secondary.main',
                      borderRadius: 99,
                    }}
                  />
                </Box>

                <Stack spacing={2.5} sx={{ flex: 1 }}>
                  {steps.map((step, i) => (
                    <StepItem
                      key={step.number}
                      step={step}
                      active={i === activeIndex}
                    />
                  ))}
                </Stack>
              </Stack>
            </Box>

            {/* Mockup que se arma */}
            <Box sx={{ position: 'relative' }}>
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: -60,
                  background: `radial-gradient(ellipse at center, ${p.secondary}14 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />
              <BuildMockup t={t} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Methodology;
