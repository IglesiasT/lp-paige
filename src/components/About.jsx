import { Box, Container, Typography, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { config } from '../config.js';
import Reveal from './Reveal.jsx';

const p = config.palette;

const About = () => (
  <Box
    id="sobre-nosotros"
    component="section"
    sx={{
      py: { xs: 10, md: 16 },
      bgcolor: p.soft,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.32fr 0.68fr' },
          gap: { xs: 4, md: 8 },
        }}
      >
        {/* Columna de etiqueta */}
        <Box>
          <Reveal>
            <Stack direction="row" spacing={1.75} alignItems="center">
              <Box sx={{ width: 28, height: 1, bgcolor: 'secondary.main' }} />
              <Typography
                variant="overline"
                sx={{ color: 'text.secondary', textTransform: 'uppercase' }}
              >
                {config.about.overline}
              </Typography>
            </Stack>
          </Reveal>
        </Box>

        {/* Columna de contenido */}
        <Box>
          <Reveal>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', sm: '2.7rem', md: '3.4rem' },
                mb: 4,
                maxWidth: 720,
              }}
            >
              {config.about.title}
            </Typography>
          </Reveal>

          <Stack spacing={2.5} sx={{ maxWidth: 640, mb: 6 }}>
            {config.about.paragraphs.map((text, i) => (
              <Reveal key={text} delay={80 + i * 80}>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.08rem' },
                    lineHeight: 1.85,
                  }}
                >
                  {text}
                </Typography>
              </Reveal>
            ))}
          </Stack>

          {/* Cita destacada */}
          <Reveal delay={120}>
            <Box
              sx={{
                position: 'relative',
                borderLeft: '2px solid',
                borderColor: 'secondary.main',
                pl: { xs: 3, md: 4 },
                py: 1,
                mb: 6,
                maxWidth: 660,
              }}
            >
              <Typography
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: -18,
                  left: { xs: 14, md: 22 },
                  fontFamily: (t) => t.typography.fontFamilyHeading,
                  fontSize: '4.5rem',
                  color: 'secondary.main',
                  opacity: 0.25,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                “
              </Typography>
              <Typography
                sx={{
                  fontFamily: (t) => t.typography.fontFamilyHeading,
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'text.primary',
                  position: 'relative',
                }}
              >
                {config.about.quote}
              </Typography>
            </Box>
          </Reveal>

          {/* Highlights */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: { xs: 2, md: 3 },
            }}
          >
            {config.about.highlights.map((item, i) => (
              <Reveal key={item} delay={i * 90}>
                <Stack
                  spacing={1.5}
                  sx={{
                    pt: 2.5,
                    borderTop: '1px solid',
                    borderColor: 'rgba(24, 24, 27, 0.15)',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 15, color: p.onDark }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'text.primary',
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </Typography>
                </Stack>
              </Reveal>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default About;
