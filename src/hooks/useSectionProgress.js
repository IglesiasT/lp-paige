import { useEffect, useRef, useState } from 'react';

const clamp01 = (n) => Math.min(1, Math.max(0, n));

// El mockup se redibuja con cada cambio de progreso. Cuantizar a 250 pasos se
// ve igual de fluido y evita re-renders redundantes al scrollear despacio.
const STEPS = 250;
const quantize = (n) => Math.round(n * STEPS) / STEPS;

/**
 * Progreso de scroll dentro de una sección alta con contenido sticky.
 *
 * Devuelve [ref, progress] donde progress va de 0 (la sección recién se pegó
 * arriba) a 1 (está por despegarse). Es la base del scroll narrativo de
 * Metodología: cuánto scrolleaste = cuánto se armó la página del mockup.
 *
 * Se actualiza dentro de requestAnimationFrame para no forzar layout en cada
 * evento de scroll.
 */
export const useSectionProgress = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let frame = null;

    const measure = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      // Distancia scrolleable = alto de la sección menos la ventana pegada.
      const scrollable = rect.height - window.innerHeight;
      const next =
        scrollable <= 0
          ? Number(rect.top <= 0)
          : quantize(clamp01(-rect.top / scrollable));
      // Evita re-renderizar cuando el valor no cambió.
      setProgress((prev) => (prev === next ? prev : next));
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

  return [ref, progress];
};

export default useSectionProgress;
