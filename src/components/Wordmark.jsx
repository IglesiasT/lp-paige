import { Box, Typography } from '@mui/material';
import { config } from '../config.js';

/**
 * Logotipo tipográfico. Se dibuja con la tipografía del sitio en vez de un SVG
 * para que herede el color del contexto (navbar clara u oscura) sin duplicar
 * archivos de logo.
 */
const Wordmark = ({ color = 'text.primary', size = 26, href = '#top', ...rest }) => (
  <Box
    component={href ? 'a' : 'div'}
    href={href || undefined}
    aria-label={config.brand.name}
    sx={{
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: '3px',
      textDecoration: 'none',
      color,
      lineHeight: 1,
    }}
    {...rest}
  >
    <Typography
      component="span"
      sx={{
        fontFamily: (t) => t.typography.fontFamilyHeading,
        fontSize: size,
        fontWeight: 400,
        letterSpacing: '-0.03em',
        color: 'inherit',
        lineHeight: 1,
      }}
    >
      paige
    </Typography>
    {/* Cuña terracota — el mismo gesto del favicon */}
    <Box
      component="span"
      aria-hidden
      sx={{
        width: size * 0.2,
        height: size * 0.2,
        bgcolor: 'secondary.main',
        clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
        transform: 'translateY(-0.05em)',
      }}
    />
  </Box>
);

export default Wordmark;
