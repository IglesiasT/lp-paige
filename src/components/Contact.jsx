import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { config } from '../config.js';
import { buildWhatsAppUrl } from '../utils/links.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

const p = config.palette;
const initialForm = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  // Señuelo anti-spam: un humano nunca lo completa porque no lo ve
  const [trap, setTrap] = useState('');

  const waUrl = buildWhatsAppUrl(
    config.contact.whatsapp,
    config.contact.whatsappMessage,
  );
  const labels = config.contactSection.formLabels;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(config.contact.formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          _subject: config.contactSection.mailSubject.replace(
            '{nombre}',
            form.name || 'alguien',
          ),
          _gotcha: trap,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const isSending = status === 'sending';

  // Inputs sobre fondo oscuro
  const darkInputSx = {
    '& .MuiFilledInput-root': {
      bgcolor: 'rgba(244, 241, 234, 0.05)',
      color: p.onDark,
      borderRadius: '12px !important',
      border: '1px solid',
      borderColor: p.borderDark,
      transition: 'background-color 0.25s ease, border-color 0.25s ease',
      '&:hover': { bgcolor: 'rgba(244, 241, 234, 0.08)' },
      '&.Mui-focused': {
        bgcolor: 'rgba(244, 241, 234, 0.09)',
        borderColor: 'rgba(200, 149, 108, 0.6)',
      },
      '&::before, &::after': { display: 'none' },
    },
    '& .MuiFilledInput-input': { color: p.onDark, py: 2 },
    '& .MuiInputLabel-root': {
      color: p.onDarkMuted,
      fontSize: '0.95rem',
      '&.Mui-focused': { color: 'secondary.main' },
    },
  };

  // Solo mostramos los canales que están cargados en config.
  const infoItems = [
    config.contact.whatsappDisplay && {
      Icon: WhatsAppIcon,
      label: config.contact.whatsappDisplay,
      href: waUrl,
    },
    config.contact.instagramHandle && {
      Icon: InstagramIcon,
      label: config.contact.instagramHandle,
      href: config.contact.instagramUrl,
    },
    config.contact.email && {
      Icon: EmailIcon,
      label: config.contact.email,
      href: `mailto:${config.contact.email}`,
    },
    config.contact.location && {
      Icon: LocationOnIcon,
      label: config.contact.location,
      href: null,
    },
  ].filter(Boolean);

  return (
    <Box
      id="contacto"
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: p.darkDeep,
        color: p.onDark,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${p.borderDark} 1px, transparent 1px), linear-gradient(90deg, ${p.borderDark} 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 70% 70% at 70% 30%, #000 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 70% 30%, #000 0%, transparent 100%)',
          opacity: 0.55,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: '-25%',
          left: '-10%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${p.secondary}26 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          overline={config.contactSection.overline}
          title={config.contactSection.title}
          subtitle={config.contactSection.subtitle}
          dark
          maxWidth={560}
        />

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.35fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'flex-start',
          }}
        >
          {/* ---- Formulario ---- */}
          <Reveal>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <Box
                  component="input"
                  type="text"
                  name="_gotcha"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    opacity: 0,
                    pointerEvents: 'none',
                    left: -9999,
                  }}
                />
                <TextField
                  name="name"
                  label={labels.name}
                  required
                  fullWidth
                  variant="filled"
                  value={form.name}
                  onChange={handleChange('name')}
                  disabled={isSending}
                  sx={darkInputSx}
                />
                <TextField
                  name="email"
                  label={labels.email}
                  type="email"
                  required
                  fullWidth
                  variant="filled"
                  value={form.email}
                  onChange={handleChange('email')}
                  disabled={isSending}
                  sx={darkInputSx}
                />
                <TextField
                  name="message"
                  label={labels.message}
                  required
                  fullWidth
                  multiline
                  rows={4}
                  variant="filled"
                  value={form.message}
                  onChange={handleChange('message')}
                  disabled={isSending}
                  sx={darkInputSx}
                />

                {status === 'success' && (
                  <Alert
                    severity="success"
                    onClose={() => setStatus('idle')}
                    sx={{ borderRadius: 2 }}
                  >
                    ¡Mensaje enviado! Te respondemos a la brevedad.
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert
                    severity="error"
                    onClose={() => setStatus('idle')}
                    sx={{ borderRadius: 2 }}
                  >
                    No pudimos enviar tu mensaje. Probá por WhatsApp.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={
                    isSending ? (
                      <CircularProgress size={18} sx={{ color: 'inherit' }} />
                    ) : (
                      <ArrowForwardIcon />
                    )
                  }
                  disabled={isSending}
                  sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, mt: 1 }}
                >
                  {isSending ? 'Enviando…' : labels.submit}
                </Button>
              </Stack>
            </Box>
          </Reveal>

          {/* ---- Otros canales ---- */}
          <Reveal delay={140}>
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: p.darkElevated,
                border: '1px solid',
                borderColor: p.borderDark,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: p.onDarkMuted,
                  textTransform: 'uppercase',
                  display: 'block',
                  mb: 3,
                }}
              >
                {config.contactSection.infoTitle}
              </Typography>

              <Stack spacing={2}>
                {infoItems.map(({ Icon, label, href }) => (
                  <Box
                    key={label}
                    component={href ? 'a' : 'div'}
                    href={href || undefined}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener' : undefined}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: p.onDark,
                      textDecoration: 'none',
                      transition: 'color 0.25s ease',
                      '&:hover': href ? { color: 'secondary.main' } : {},
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: 'rgba(244, 241, 234, 0.06)',
                        border: '1px solid',
                        borderColor: p.borderDark,
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 19 }} />
                    </Box>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                href={waUrl}
                target="_blank"
                rel="noopener"
                sx={{
                  mt: 4,
                  borderColor: p.borderDark,
                  color: p.onDark,
                  '&:hover': {
                    borderColor: p.onDark,
                    bgcolor: 'rgba(244, 241, 234, 0.06)',
                  },
                }}
              >
                {config.contactSection.whatsappLabel}
              </Button>
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
