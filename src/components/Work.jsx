import { Box, Container, Typography, Stack, Button } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { config } from '../config.js';
import SiteMockup from './SiteMockup.jsx';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const p = config.palette;

const Work = () => (
  <Box
    id="trabajos"
    component="section"
    sx={{
      py: { xs: 10, md: 16 },
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Container maxWidth="lg">
      <SectionHeading
        overline={config.work.overline}
        title={config.work.title}
        subtitle={config.work.subtitle}
      />

      <Stack spacing={{ xs: 10, md: 16 }} sx={{ mt: { xs: 7, md: 11 } }}>
        {config.work.items.map((item, index) => {
          const flipped = index % 2 === 1;

          return (
            <Box
              key={item.id}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
                gap: { xs: 4, md: 7 },
                alignItems: 'center',
              }}
            >
              {/* ---- Mockup con inclinación 3D ---- */}
              <Reveal
                direction={flipped ? 'right' : 'left'}
                y={40}
                sx={{
                  order: { xs: 1, md: flipped ? 2 : 1 },
                  perspective: '1600px',
                }}
              >
                <Box
                  sx={{
                    transformStyle: 'preserve-3d',
                    transform: {
                      xs: 'none',
                      md: `rotateY(${flipped ? 9 : -9}deg) rotateX(6deg)`,
                    },
                    transition:
                      'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s ease',
                    '&:hover': {
                      transform: {
                        xs: 'none',
                        md: 'rotateY(0deg) rotateX(0deg) scale(1.02)',
                      },
                    },
                    '@media (prefers-reduced-motion: reduce)': {
                      transform: 'none',
                      transition: 'none',
                      '&:hover': { transform: 'none' },
                    },
                  }}
                >
                  {item.screenshot ? (
                    <Box
                      component="img"
                      src={item.screenshot}
                      alt={`Landing page de ${item.client}`}
                      sx={{
                        width: '100%',
                        display: 'block',
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 30px 60px -28px rgba(11,11,13,0.55)',
                      }}
                    />
                  ) : (
                    <SiteMockup spec={item.mockup} />
                  )}
                </Box>
              </Reveal>

              {/* ---- Ficha del proyecto ---- */}
              <Reveal
                delay={120}
                sx={{ order: { xs: 2, md: flipped ? 1 : 2 } }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography
                    sx={{
                      fontFamily: (t) => t.typography.fontFamilyMono,
                      fontSize: '0.72rem',
                      color: 'secondary.main',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Box sx={{ height: 1, flex: 1, bgcolor: 'divider' }} />
                  <Typography
                    sx={{
                      fontFamily: (t) => t.typography.fontFamilyMono,
                      fontSize: '0.72rem',
                      color: 'text.secondary',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {item.year}
                  </Typography>
                </Stack>

                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' }, mb: 1 }}
                >
                  {item.client}
                </Typography>

                <Typography
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    mb: 2.5,
                  }}
                >
                  {item.sector}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    fontSize: '0.98rem',
                    mb: 3,
                  }}
                >
                  {item.description}
                </Typography>

                {/* Paleta del proyecto */}
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  {[
                    item.mockup.palette.ink,
                    item.mockup.palette.accent,
                    item.mockup.palette.accentSoft,
                    item.mockup.palette.bg,
                  ].map((swatch) => (
                    <Box
                      key={swatch}
                      title={swatch}
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        bgcolor: swatch,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  ))}
                </Stack>

                <Stack
                  direction="row"
                  sx={{ flexWrap: 'wrap', gap: 1, mb: item.url ? 3.5 : 0 }}
                >
                  {item.tags.map((tag) => (
                    <Box
                      key={tag}
                      sx={{
                        px: 1.5,
                        py: 0.6,
                        borderRadius: 99,
                        border: '1px solid',
                        borderColor: 'divider',
                        fontFamily: (t) => t.typography.fontFamilyMono,
                        fontSize: '0.68rem',
                        letterSpacing: '0.04em',
                        color: 'text.secondary',
                        bgcolor: p.soft,
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
                </Stack>

                {item.url && (
                  <Button
                    variant="outlined"
                    color="primary"
                    href={item.url}
                    target="_blank"
                    rel="noopener"
                    endIcon={<ArrowOutwardIcon sx={{ fontSize: 18 }} />}
                  >
                    {config.work.ctaLabel}
                  </Button>
                )}
              </Reveal>
            </Box>
          );
        })}
      </Stack>
    </Container>
  </Box>
);

export default Work;
