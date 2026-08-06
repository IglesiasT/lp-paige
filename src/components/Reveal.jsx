import { Box } from '@mui/material';
import { useReveal } from '../hooks/useReveal.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

/**
 * Envoltorio de aparición al scrollear. Solo CSS transitions.
 *
 * @param {number} delay      retraso en ms (para escalonar listas)
 * @param {number} y          desplazamiento inicial en px
 * @param {string} direction  'up' | 'left' | 'right'
 */
const Reveal = ({
  children,
  delay = 0,
  y = 28,
  direction = 'up',
  threshold,
  sx,
  ...rest
}) => {
  const [ref, visible] = useReveal({ threshold });
  const reduced = usePrefersReducedMotion();

  const offset = {
    up: `translate3d(0, ${y}px, 0)`,
    left: `translate3d(-${y}px, 0, 0)`,
    right: `translate3d(${y}px, 0, 0)`,
  }[direction];

  return (
    <Box
      ref={ref}
      sx={{
        opacity: reduced || visible ? 1 : 0,
        transform: reduced || visible ? 'translate3d(0, 0, 0)' : offset,
        transition: reduced
          ? 'none'
          : `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Reveal;
