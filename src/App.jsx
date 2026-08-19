import { Box, GlobalStyles } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Methodology from './components/Methodology.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import GrainOverlay from './components/GrainOverlay.jsx';
import { config } from './config.js';

const p = config.palette;

const globals = {
  html: {
    scrollBehavior: 'smooth',
    // El navbar flota fijo: los anclas necesitan aire arriba.
    scrollPaddingTop: 96,
  },
  '@media (prefers-reduced-motion: reduce)': {
    html: { scrollBehavior: 'auto' },
  },
  body: {
    overflowX: 'hidden',
    WebkitFontSmoothing: 'antialiased',
    textRendering: 'optimizeLegibility',
  },
  '::selection': { backgroundColor: p.secondary, color: p.darkDeep },
  '*::-webkit-scrollbar': { width: 10 },
  '*::-webkit-scrollbar-track': { background: p.background },
  '*::-webkit-scrollbar-thumb': {
    background: 'rgba(24, 24, 27, 0.22)',
    borderRadius: 99,
    border: `3px solid ${p.background}`,
  },
  '*::-webkit-scrollbar-thumb:hover': { background: 'rgba(24, 24, 27, 0.4)' },
};

const App = () => (
  <Box sx={{ bgcolor: 'background.default' }}>
    <GlobalStyles styles={globals} />
    <Navbar />
    <main>
      <Hero />
      <Work />
      <About />
      <Services />
      <Methodology />
      {config.testimonials.enabled && <Testimonials />}
      <Contact />
    </main>
    <Footer />
    <WhatsAppFloat />
    <GrainOverlay />
  </Box>
);

export default App;
