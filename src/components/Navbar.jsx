import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  Container,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { config } from '../config.js';
import { buildWhatsAppUrl } from '../utils/links.js';
import Wordmark from './Wordmark.jsx';

const p = config.palette;

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  // `light` = navbar sobre el hero oscuro. Al pasarlo, invierte a vidrio claro.
  const [light, setLight] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;

    const measure = () => {
      frame = null;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      setLight(y < window.innerHeight * 0.72);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const waUrl = buildWhatsAppUrl(
    config.contact.whatsapp,
    config.contact.whatsappMessage,
  );

  const fg = light ? p.onDark : p.textPrimary;
  const fgMuted = light ? p.onDarkMuted : p.textSecondary;

  return (
    <>
      {/* Barra de progreso de lectura */}
      <Box
        aria-hidden
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: (t) => t.zIndex.appBar + 2,
          transformOrigin: '0 50%',
          transform: `scaleX(${progress})`,
          bgcolor: 'secondary.main',
          transition: 'transform 0.1s linear',
        }}
      />

      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: { xs: 10, md: 18 },
          left: 0,
          right: 0,
          zIndex: (t) => t.zIndex.appBar + 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: { xs: 2, md: 2.5 },
              py: { xs: 1.25, md: 1.5 },
              borderRadius: 999,
              border: '1px solid',
              borderColor: light ? p.borderDark : 'rgba(24, 24, 27, 0.08)',
              bgcolor: light
                ? 'rgba(11, 11, 13, 0.42)'
                : 'rgba(250, 250, 245, 0.78)',
              backdropFilter: 'blur(18px) saturate(160%)',
              WebkitBackdropFilter: 'blur(18px) saturate(160%)',
              boxShadow: light ? 'none' : '0 8px 30px rgba(24, 24, 27, 0.08)',
              transition:
                'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
            }}
          >
            <Wordmark color={fg} size={isMobile ? 22 : 25} />

            {!isMobile && (
              <Stack direction="row" spacing={3.5} alignItems="center">
                {config.navbar.links.map((link) => (
                  <Typography
                    key={link.href}
                    component="a"
                    href={link.href}
                    sx={{
                      color: fgMuted,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      position: 'relative',
                      transition: 'color 0.25s ease',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -5,
                        left: 0,
                        width: 0,
                        height: 1,
                        bgcolor: 'secondary.main',
                        transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      },
                      '&:hover': {
                        color: fg,
                        '&::after': { width: '100%' },
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            )}

            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="contained"
                color="secondary"
                size={isMobile ? 'small' : 'medium'}
                href={waUrl}
                target="_blank"
                rel="noopener"
                sx={{ px: { xs: 2.25, md: 3 } }}
              >
                {config.navbar.ctaLabel}
              </Button>

              {isMobile && (
                <IconButton
                  onClick={() => setOpen(true)}
                  aria-label="Abrir menú"
                  sx={{ color: fg }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { bgcolor: p.darkDeep, color: p.onDark, width: 290, border: 'none' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, pt: 3, pb: 2 }}
        >
          <Wordmark color={p.onDark} size={24} href={null} />
          <IconButton
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            sx={{ color: p.onDark }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack sx={{ px: 3, pt: 2 }}>
          {config.navbar.links.map((link, i) => (
            <Typography
              key={link.href}
              component="a"
              href={link.href}
              onClick={() => setOpen(false)}
              sx={{
                py: 2,
                color: p.onDark,
                textDecoration: 'none',
                fontFamily: (t) => t.typography.fontFamilyHeading,
                fontSize: '1.6rem',
                borderBottom: '1px solid',
                borderColor: p.borderDark,
                display: 'flex',
                alignItems: 'baseline',
                gap: 1.5,
                '&:hover': { color: 'secondary.main' },
              }}
            >
              <Box
                component="span"
                sx={{
                  fontFamily: (t) => t.typography.fontFamilyMono,
                  fontSize: '0.65rem',
                  color: p.onDarkMuted,
                }}
              >
                0{i + 1}
              </Box>
              {link.label}
            </Typography>
          ))}
        </Stack>
      </Drawer>
    </>
  );
};

export default Navbar;
