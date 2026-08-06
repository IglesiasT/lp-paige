import { useEffect, useState } from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { config } from '../config.js';
import { buildWhatsAppUrl } from '../utils/links.js';

const SCROLL_THRESHOLD = 400;

const WhatsAppFloat = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waUrl = buildWhatsAppUrl(
    config.contact.whatsapp,
    config.contact.whatsappMessage,
  );

  return (
    <Zoom in={visible}>
      <Tooltip title="Escribime por WhatsApp" placement="left">
        <Fab
          color="primary"
          href={waUrl}
          target="_blank"
          rel="noopener"
          aria-label="Abrir conversación de WhatsApp"
          sx={{
            position: 'fixed',
            bottom: { xs: 20, md: 32 },
            right: { xs: 20, md: 32 },
            bgcolor: '#25D366',
            '&:hover': { bgcolor: '#1ebe5b' },
            zIndex: (theme) => theme.zIndex.tooltip + 1,
            boxShadow: '0 10px 30px rgba(37, 211, 102, 0.45)',
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 30 }} />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default WhatsAppFloat;
