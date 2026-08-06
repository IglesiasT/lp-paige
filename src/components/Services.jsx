import { Box, Container, Typography, Stack } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DevicesIcon from '@mui/icons-material/Devices';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { config } from '../config.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const p = config.palette;

const iconMap = {
  RocketLaunch: RocketLaunchIcon,
  Devices: DevicesIcon,
  TrendingUp: TrendingUpIcon,
  SupportAgent: SupportAgentIcon,
};

// Bento asimétrico: fila 1 = 7|5, fila 2 = 5|7.
const spans = [7, 5, 5, 7];

const Services = () => (
  <Box
    id="servicios"
    component="section"
    sx={{
      py: { xs: 10, md: 16 },
      bgcolor: p.darkDeep,
      color: p.onDark,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Halo terracota */}
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 900,
        height: 500,
        background: `radial-gradient(ellipse, ${p.secondary}22 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />

    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      <SectionHeading
        overline={config.services.overline}
        title={config.services.title}
        subtitle={config.services.subtitle}
        dark
      />

      <Box
        sx={{
          mt: { xs: 6, md: 9 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {config.services.items.map((service, i) => {
          const Icon = iconMap[service.icon] || AutoAwesomeIcon;
          return (
            <Reveal
              key={service.title}
              delay={i * 90}
              sx={{ gridColumn: { xs: 'auto', md: `span ${spans[i] ?? 6}` } }}
            >
              <Stack
                sx={{
                  height: '100%',
                  minHeight: { xs: 'auto', md: 300 },
                  p: { xs: 3.5, md: 4.5 },
                  borderRadius: 4,
                  bgcolor: p.darkElevated,
                  border: '1px solid',
                  borderColor: p.borderDark,
                  position: 'relative',
                  overflow: 'hidden',
                  transition:
                    'border-color 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.4s ease',
                  '&:hover': {
                    borderColor: 'rgba(200, 149, 108, 0.45)',
                    transform: 'translateY(-4px)',
                    '& .svc-glow': { opacity: 1 },
                    '& .svc-arrow': { opacity: 1, transform: 'translate(0, 0)' },
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                    '&:hover': { transform: 'none' },
                  },
                }}
              >
                {/* Brillo en la esquina al pasar el mouse */}
                <Box
                  className="svc-glow"
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    top: -120,
                    right: -120,
                    width: 320,
                    height: 320,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.secondary}30 0%, transparent 65%)`,
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    pointerEvents: 'none',
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ mb: 'auto', position: 'relative' }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2.5,
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'rgba(200, 149, 108, 0.14)',
                      border: '1px solid rgba(200, 149, 108, 0.28)',
                    }}
                  >
                    <Icon sx={{ fontSize: 26, color: 'secondary.main' }} />
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: (t) => t.typography.fontFamilyMono,
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      color: p.onDarkMuted,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                </Stack>

                <Box sx={{ mt: { xs: 4, md: 6 }, position: 'relative' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.6rem', md: '2rem' },
                      color: p.onDark,
                      mb: 1.5,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: p.onDarkMuted,
                      lineHeight: 1.75,
                      fontSize: '0.95rem',
                      maxWidth: 460,
                      mb: 2.5,
                    }}
                  >
                    {service.description}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.6,
                        borderRadius: 99,
                        border: '1px solid',
                        borderColor: p.borderDark,
                        fontFamily: (t) => t.typography.fontFamilyMono,
                        fontSize: '0.68rem',
                        letterSpacing: '0.05em',
                        color: 'secondary.main',
                      }}
                    >
                      {service.tag}
                    </Box>
                    <ArrowOutwardIcon
                      className="svc-arrow"
                      sx={{
                        fontSize: 18,
                        color: 'secondary.main',
                        opacity: 0,
                        transform: 'translate(-6px, 6px)',
                        transition: 'opacity 0.35s ease, transform 0.35s ease',
                      }}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Reveal>
          );
        })}
      </Box>
    </Container>
  </Box>
);

export default Services;
