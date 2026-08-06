import { useEffect, useRef, useState } from 'react';

/**
 * Revela un elemento cuando entra en viewport.
 * Devuelve [ref, visible] — el ref va al nodo a observar.
 *
 * @param {object}  options
 * @param {number}  options.threshold  proporción visible para disparar
 * @param {string}  options.rootMargin margen del root (útil para adelantar)
 * @param {boolean} options.once       si false, vuelve a ocultarse al salir
 */
export const useReveal = ({
  threshold = 0.18,
  rootMargin = '0px 0px -8% 0px',
  once = true,
} = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Sin soporte de IntersectionObserver mostramos todo directamente.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, visible];
};

export default useReveal;
