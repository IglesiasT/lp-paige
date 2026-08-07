import { createTheme } from '@mui/material/styles';

const HEADING_FAMILY = '"Playfair Display", "Georgia", serif';
const BODY_FAMILY = '"DM Sans", "Helvetica", "Arial", sans-serif';
// Mono para overlines, numeración y etiquetas técnicas — es lo que le da
// el aire de estudio de diseño y la diferencia de las landings de clientes.
const MONO_FAMILY = '"JetBrains Mono", "SFMono-Regular", "Consolas", monospace';

export const buildTheme = (palette) =>
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: palette.primary,           // #18181B ink
        light: palette.primaryLight,     // #3F3F46
        contrastText: '#FAFAF5',         // paper sobre ink
      },
      secondary: {
        main: palette.secondary,         // #C8956C terracota
        light: palette.secondaryLight,
        contrastText: '#18181B',
      },
      background: {
        default: palette.background,     // #FAFAF5 paper
        paper: palette.paper,
      },
      text: {
        primary: palette.textPrimary,    // #18181B
        secondary: palette.textSecondary, // #71717A slate
      },
      divider: 'rgba(24, 24, 27, 0.08)',
      // Tokens propios, accesibles como theme.palette.brand.*
      brand: {
        soft: palette.soft,
        darkDeep: palette.darkDeep,
        darkElevated: palette.darkElevated,
        onDark: palette.onDark,
        onDarkMuted: palette.onDarkMuted,
        borderDark: palette.borderDark,
      },
    },
    typography: {
      fontFamily: BODY_FAMILY,
      // Expuestas para usarlas puntualmente desde los componentes
      fontFamilyHeading: HEADING_FAMILY,
      fontFamilyMono: MONO_FAMILY,
      h1: {
        fontFamily: HEADING_FAMILY,
        fontWeight: 400,               // Playfair luce mejor en regular para marcas editoriales
        letterSpacing: '-0.02em',
        lineHeight: 1.02,
      },
      h2: {
        fontFamily: HEADING_FAMILY,
        fontWeight: 400,
        letterSpacing: '-0.02em',
        lineHeight: 1.08,
      },
      h3: {
        fontFamily: HEADING_FAMILY,
        fontWeight: 400,
        letterSpacing: '-0.015em',
        lineHeight: 1.12,
      },
      h4: {
        fontFamily: HEADING_FAMILY,
        fontWeight: 400,
        lineHeight: 1.2,
      },
      h5: {
        fontFamily: BODY_FAMILY,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontFamily: BODY_FAMILY,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      subtitle1: { fontWeight: 500 },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
      overline: {
        fontFamily: MONO_FAMILY,
        fontWeight: 500,
        letterSpacing: '0.18em',
        fontSize: '0.7rem',
        lineHeight: 1,
      },
    },
    shape: { borderRadius: 16 },
    shadows: [
      'none',
      '0 2px 8px rgba(24, 24, 27, 0.04)',
      '0 4px 16px rgba(24, 24, 27, 0.06)',
      '0 8px 24px rgba(24, 24, 27, 0.08)',
      '0 12px 32px rgba(24, 24, 27, 0.10)',
      ...Array(20).fill('0 16px 48px rgba(24, 24, 27, 0.12)'),
    ],
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 999,          // pill — más contemporáneo que el 10px anterior
            paddingInline: 28,
            paddingBlock: 12,
            fontSize: '0.95rem',
            transition:
              'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, color 0.25s ease',
            '&:hover': { transform: 'translateY(-2px)' },
            '&:active': { transform: 'translateY(0)' },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': { transform: 'none' },
            },
          },
          sizeLarge: {
            paddingInline: 34,
            paddingBlock: 15,
            fontSize: '1rem',
          },
          containedPrimary: {
            backgroundColor: palette.primary,
            '&:hover': { backgroundColor: palette.primaryLight },
          },
          containedSecondary: {
            boxShadow: '0 10px 30px -12px rgba(200, 149, 108, 0.65)',
            '&:hover': {
              backgroundColor: palette.secondaryLight,
              boxShadow: '0 16px 36px -12px rgba(200, 149, 108, 0.8)',
            },
          },
          outlinedPrimary: {
            borderColor: 'rgba(24, 24, 27, 0.25)',
            '&:hover': {
              borderColor: palette.primary,
              backgroundColor: 'rgba(24, 24, 27, 0.04)',
            },
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            border: '1px solid rgba(24, 24, 27, 0.08)',
            boxShadow: '0 4px 24px rgba(24, 24, 27, 0.04)',
            transition:
              'box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            fontFamily: MONO_FAMILY,
            fontSize: '0.72rem',
            letterSpacing: '0.04em',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.primary,
            },
          },
        },
      },
    },
  });
