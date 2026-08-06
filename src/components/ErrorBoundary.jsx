import { Component } from 'react';

/**
 * Si el canvas WebGL no arranca (driver viejo, GPU bloqueada, contexto perdido)
 * la landing no puede romperse: mostramos el fallback y seguimos.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.warn('[Paige] escena 3D deshabilitada:', error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default ErrorBoundary;
