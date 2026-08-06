import { Box, Container, Typography, Stack } from '@mui/material';
import { config } from '../config.js';
import Wordmark from './Wordmark.jsx';

const p = config.palette;
const year = new Date().getFullYear();

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: p.darkDeep,
      color: p.onDark,
      borderTop: '1px solid',
      borderColor: p.borderDark,
      pt: { xs: 7, md: 10 },
      overflow: 'hidden',
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.4fr repeat(2, 1fr)' },
          gap: { xs: 5, md: 6 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Box>
          <Wordmark color={p.onDark} size={30} />
          <Typography
            sx={{
              mt: 2.5,
              color: p.onDarkMuted,
              fontSize: '0.95rem',
              lineHeight: 1.75,
              maxWidth: 320,
            }}
          >
            {config.footer.tagline}
          </Typography>
        </Box>

        {config.footer.columns.map((column) => (
          <Box key={column.title}>
            <Typography
              variant="overline"
              sx={{
                color: p.onDarkMuted,
                textTransform: 'uppercase',
                display: 'block',
                mb: 2.5,
              }}
            >
              {column.title}
            </Typography>
            <Stack spacing={1.5}>
              {column.links.map((link) => (
                <Typography
                  key={`${column.title}-${link.label}`}
                  component="a"
                  href={link.href}
                  sx={{
                    color: p.onDark,
                    textDecoration: 'none',
                    fontSize: '0.92rem',
                    opacity: 0.85,
                    transition: 'color 0.25s ease, opacity 0.25s ease',
                    '&:hover': { color: 'secondary.main', opacity: 1 },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{
          py: 3,
          borderTop: '1px solid',
          borderColor: p.borderDark,
        }}
      >
        <Typography
          sx={{
            fontFamily: (t) => t.typography.fontFamilyMono,
            fontSize: '0.7rem',
            letterSpacing: '0.06em',
            color: p.onDarkMuted,
          }}
        >
          © {year} {config.brand.name}. {config.footer.rights}
        </Typography>
        <Typography
          sx={{
            fontFamily: (t) => t.typography.fontFamilyMono,
            fontSize: '0.7rem',
            letterSpacing: '0.06em',
            color: p.onDarkMuted,
          }}
        >
          {config.footer.credit}
        </Typography>
      </Stack>
    </Container>

    {/* Logotipo gigante recortado por el borde inferior */}
    <Box
      aria-hidden
      sx={{
        display: 'flex',
        justifyContent: 'center',
        lineHeight: 0.72,
        overflow: 'hidden',
        height: { xs: '0.42em', md: '0.46em' },
        fontSize: { xs: '5rem', sm: '9rem', md: '15rem', lg: '19rem' },
        userSelect: 'none',
      }}
    >
      <Box
        component="span"
        sx={{
          fontFamily: (t) => t.typography.fontFamilyHeading,
          fontSize: '1em',
          letterSpacing: '-0.04em',
          background: `linear-gradient(180deg, ${p.onDark}22 0%, ${p.onDark}05 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          whiteSpace: 'nowrap',
        }}
      >
        paige
      </Box>
    </Box>
  </Box>
);

export default Footer;
