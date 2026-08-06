import { Box } from '@mui/material';

// Ruido generado con feTurbulence, embebido como data URI — sin pedidos extra.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Grano sutil sobre toda la página. Le saca el plano digital a los fondos
 * planos y ata las secciones claras con las oscuras.
 */
const GrainOverlay = () => (
  <Box
    aria-hidden
    sx={{
      position: 'fixed',
      inset: 0,
      backgroundImage: NOISE,
      opacity: 0.035,
      mixBlendMode: 'overlay',
      pointerEvents: 'none',
      zIndex: 9999,
    }}
  />
);

export default GrainOverlay;
