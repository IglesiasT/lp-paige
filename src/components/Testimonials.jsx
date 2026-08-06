import { Box, Container, Typography, Stack, Rating } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { config } from '../config.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const p = config.palette;

const Testimonials = () => (
  <Box
    id="testimonios"
    component="section"
    sx={{ py: { xs: 10, md: 16 }, bgcolor: p.soft }}
  >
    <Container maxWidth="lg">
      <SectionHeading
        overline={config.testimonials.overline}
        title={config.testimonials.title}
      />

      <Box
        sx={{
          mt: { xs: 6, md: 9 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {config.testimonials.items.map((item, i) => (
          <Reveal key={item.name} delay={i * 100}>
            <Stack
              sx={{
                height: '100%',
                p: { xs: 3.5, md: 4 },
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                transition:
                  'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 24px 48px -24px rgba(24, 24, 27, 0.25)',
                },
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                  '&:hover': { transform: 'none' },
                },
              }}
            >
              <Typography
                aria-hidden
                sx={{
                  fontFamily: (t) => t.typography.fontFamilyHeading,
                  fontSize: '4rem',
                  lineHeight: 0.6,
                  color: 'secondary.main',
                  opacity: 0.3,
                  mb: 2,
                }}
              >
                “
              </Typography>

              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: '0.98rem',
                  lineHeight: 1.8,
                  flex: 1,
                  mb: 3,
                }}
              >
                {item.text}
              </Typography>

              <Rating
                value={item.rating}
                readOnly
                size="small"
                icon={<StarRoundedIcon fontSize="inherit" />}
                emptyIcon={<StarRoundedIcon fontSize="inherit" />}
                sx={{ color: 'secondary.main', mb: 2.5 }}
              />

              <Stack direction="row" spacing={1.75} alignItems="center">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    bgcolor: p.soft,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: (t) => t.typography.fontFamilyHeading,
                    fontSize: '1.15rem',
                    color: 'text.primary',
                    flexShrink: 0,
                  }}
                >
                  {item.name.charAt(0)}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: (t) => t.typography.fontFamilyMono,
                      fontSize: '0.68rem',
                      letterSpacing: '0.05em',
                      color: 'text.secondary',
                      mt: 0.25,
                    }}
                  >
                    {item.role}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Reveal>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Testimonials;
