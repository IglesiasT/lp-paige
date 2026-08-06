import { Box, Typography, Stack } from '@mui/material';
import { config } from '../config.js';
import Reveal from './Reveal.jsx';

const p = config.palette;

/**
 * Encabezado de sección: overline en mono con línea, título en Playfair y
 * bajada opcional. `dark` lo adapta a las secciones de fondo oscuro.
 */
const SectionHeading = ({
  overline,
  title,
  subtitle,
  dark = false,
  align = 'left',
  maxWidth = 620,
}) => (
  <Box
    sx={{
      maxWidth,
      mx: align === 'center' ? 'auto' : 0,
      textAlign: align,
    }}
  >
    <Reveal>
      <Stack
        direction="row"
        spacing={1.75}
        alignItems="center"
        sx={{ mb: 2.5, justifyContent: align === 'center' ? 'center' : 'flex-start' }}
      >
        <Box
          sx={{
            width: 28,
            height: 1,
            bgcolor: 'secondary.main',
            display: align === 'center' ? 'none' : 'block',
          }}
        />
        <Typography
          variant="overline"
          sx={{
            color: dark ? p.onDarkMuted : 'text.secondary',
            textTransform: 'uppercase',
          }}
        >
          {overline}
        </Typography>
      </Stack>
    </Reveal>

    <Reveal delay={80}>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2.2rem', sm: '2.6rem', md: '3.2rem' },
          color: dark ? p.onDark : 'text.primary',
          mb: subtitle ? 2.5 : 0,
        }}
      >
        {title}
      </Typography>
    </Reveal>

    {subtitle && (
      <Reveal delay={160}>
        <Typography
          sx={{
            color: dark ? p.onDarkMuted : 'text.secondary',
            fontSize: { xs: '1rem', md: '1.08rem' },
            lineHeight: 1.75,
          }}
        >
          {subtitle}
        </Typography>
      </Reveal>
    )}
  </Box>
);

export default SectionHeading;
