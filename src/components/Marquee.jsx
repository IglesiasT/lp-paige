import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { config } from '../config.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

const p = config.palette;

const slide = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
`;

/**
 * Cinta infinita de capacidades. Cierra el hero oscuro y hace de puente hacia
 * las secciones claras. La lista se duplica para que el loop no tenga costura.
 */
const Marquee = () => {
  const reduced = usePrefersReducedMotion();
  const items = config.marquee.items;
  const doubled = [...items, ...items];

  return (
    <Box
      aria-hidden
      sx={{
        bgcolor: p.darkDeep,
        color: p.onDark,
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: p.borderDark,
        py: { xs: 2.25, md: 2.75 },
        overflow: 'hidden',
        position: 'relative',
        maskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: reduced ? 'none' : `${slide} 38s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <Box
            key={`${item}-${i}`}
            sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <Typography
              sx={{
                fontFamily: (t) => t.typography.fontFamilyMono,
                fontSize: { xs: '0.72rem', md: '0.78rem' },
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: p.onDarkMuted,
                px: { xs: 2, md: 3 },
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </Typography>
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                bgcolor: 'secondary.main',
                opacity: 0.7,
                flexShrink: 0,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Marquee;
