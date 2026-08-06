import { Box, Stack } from '@mui/material';
import { keyframes } from '@emotion/react';
import LockIcon from '@mui/icons-material/Lock';
import { config } from '../config.js';

const p = config.palette;

const clamp01 = (n) => Math.min(1, Math.max(0, n));
/** Normaliza `t` dentro del tramo [a, b]. */
const seg = (t, a, b) => clamp01((t - a) / (b - a));

const blink = keyframes`
  0%, 49%  { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const WIRE = 'rgba(24, 24, 27, 0.09)';
const WIRE_LINE = 'rgba(24, 24, 27, 0.18)';

/** Placeholder de texto. */
const Bar = ({ w = '100%', c = WIRE_LINE, o = 1, h = '0.45em' }) => (
  <Box sx={{ width: w, height: h, borderRadius: 99, bgcolor: c, opacity: o }} />
);

/**
 * Bloque de la página: superpone la versión wireframe y la versión final, y
 * hace crossfade entre ambas según cuánto scrolleaste.
 */
const Block = ({ h, appear, real, wire, finished }) => (
  <Box
    sx={{
      position: 'relative',
      height: h,
      opacity: appear,
      transform: `translateY(${(1 - appear) * 16}px)`,
      flexShrink: 0,
    }}
  >
    <Box sx={{ position: 'absolute', inset: 0, opacity: 1 - real }}>{wire}</Box>
    <Box sx={{ position: 'absolute', inset: 0, opacity: real }}>{finished}</Box>
  </Box>
);

/** Skeleton gris con borde punteado. */
const Wireframe = ({ children, radius = '0.6em' }) => (
  <Box
    sx={{
      height: '100%',
      borderRadius: radius,
      bgcolor: WIRE,
      border: '1px dashed',
      borderColor: WIRE_LINE,
      display: 'flex',
      alignItems: 'center',
      px: '1.2em',
      gap: '0.8em',
    }}
  >
    {children}
  </Box>
);

/**
 * Mockup que se arma con el scroll.
 * @param {number} t progreso 0→1 de la sección
 */
const BuildMockup = ({ t }) => {
  const brief = 1 - seg(t, 0.17, 0.26);
  const wire = seg(t, 0.22, 0.5);
  const real = seg(t, 0.5, 0.76);
  const live = seg(t, 0.78, 0.9);

  const appearOf = (i) => clamp01((wire - i * 0.2) / 0.4);
  const realOf = (i) => clamp01((real - i * 0.14) / 0.58);

  return (
    <Box
      sx={{
        fontSize: { xs: 'clamp(7px, 2.4vw, 12px)', md: 'clamp(8px, 1.15vw, 13px)' },
        borderRadius: '1.4em',
        overflow: 'hidden',
        bgcolor: p.paper,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: `0 40px 80px -40px rgba(11,11,13,0.45), 0 0 0 ${live * 3}px rgba(200,149,108,${live * 0.18})`,
        transition: 'box-shadow 0.4s ease',
        width: '100%',
      }}
    >
      {/* ---- Barra del navegador ---- */}
      <Stack
        direction="row"
        alignItems="center"
        spacing="0.55em"
        sx={{
          height: '2.9em',
          px: '1.1em',
          bgcolor: p.background,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {['#F0736A', '#F5BF4F', '#5FC66B'].map((dot) => (
          <Box
            key={dot}
            sx={{ width: '0.65em', height: '0.65em', borderRadius: '50%', bgcolor: dot }}
          />
        ))}
        <Box
          sx={{
            ml: '0.8em',
            flex: 1,
            height: '1.6em',
            borderRadius: 99,
            bgcolor: p.paper,
            border: '1px solid',
            borderColor: live > 0.5 ? 'rgba(95, 198, 107, 0.5)' : 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4em',
            px: '0.7em',
            fontFamily: (th) => th.typography.fontFamilyMono,
            fontSize: '0.62em',
            color: live > 0.5 ? p.textPrimary : p.textSecondary,
            transition: 'border-color 0.4s ease, color 0.4s ease',
          }}
        >
          <LockIcon
            sx={{
              fontSize: '1.2em',
              color: '#3FA34D',
              opacity: live,
              transition: 'opacity 0.4s ease',
            }}
          />
          {live > 0.5 ? 'tunegocio.com.ar' : 'borrador · sin publicar'}
        </Box>
        <Box
          sx={{
            px: '0.7em',
            py: '0.3em',
            borderRadius: 99,
            bgcolor: 'rgba(63, 163, 77, 0.12)',
            color: '#2F7F3C',
            fontFamily: (th) => th.typography.fontFamilyMono,
            fontSize: '0.55em',
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
            opacity: live,
            transform: `scale(${0.85 + live * 0.15})`,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          EN LÍNEA
        </Box>
      </Stack>

      {/* ---- Lienzo ---- */}
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '16 / 12',
          bgcolor: p.background,
          overflow: 'hidden',
        }}
      >
        {/* Paso 1 — el brief */}
        <Stack
          spacing="0.8em"
          sx={{
            position: 'absolute',
            inset: 0,
            p: '2.5em',
            justifyContent: 'center',
            opacity: brief,
            transform: `translateY(${(1 - brief) * -18}px)`,
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              fontFamily: (th) => th.typography.fontFamilyMono,
              fontSize: '0.62em',
              letterSpacing: '0.16em',
              color: p.secondary,
              mb: '0.6em',
            }}
          >
            BRIEF
          </Box>
          {config.methodology.steps.map((step, i) => (
            <Stack
              key={step.number}
              direction="row"
              alignItems="center"
              spacing="0.7em"
              sx={{ opacity: 1 - i * 0.22 }}
            >
              <Box
                sx={{
                  width: '0.5em',
                  height: '0.5em',
                  borderRadius: '50%',
                  bgcolor: p.secondary,
                  flexShrink: 0,
                }}
              />
              <Bar w={`${88 - i * 14}%`} c={p.textSecondary} o={0.3} h="0.5em" />
            </Stack>
          ))}
          <Stack direction="row" alignItems="center" spacing="0.7em" sx={{ pt: '0.4em' }}>
            <Box
              sx={{
                width: '0.5em',
                height: '0.5em',
                borderRadius: '50%',
                border: '1px solid',
                borderColor: p.textSecondary,
                opacity: 0.4,
                flexShrink: 0,
              }}
            />
            <Box
              sx={{
                width: '0.12em',
                height: '1.1em',
                bgcolor: p.textPrimary,
                animation: `${blink} 1.1s step-end infinite`,
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }}
            />
          </Stack>
        </Stack>

        {/* Pasos 2–4 — la página se arma */}
        <Stack
          spacing="0.75em"
          sx={{
            position: 'absolute',
            inset: 0,
            p: '1.1em',
            opacity: clamp01(wire * 3),
          }}
        >
          {/* Navbar */}
          <Block
            h="3em"
            appear={appearOf(0)}
            real={realOf(0)}
            wire={
              <Wireframe>
                <Bar w="18%" />
                <Box sx={{ flex: 1 }} />
                <Bar w="8%" o={0.7} />
                <Bar w="8%" o={0.7} />
                <Bar w="12%" o={0.7} />
              </Wireframe>
            }
            finished={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  height: '100%',
                  px: '1.2em',
                  borderRadius: '0.6em',
                  bgcolor: p.paper,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    fontFamily: (th) => th.typography.fontFamilyHeading,
                    fontSize: '1.1em',
                    color: p.textPrimary,
                  }}
                >
                  tu marca
                </Box>
                <Stack direction="row" spacing="0.9em" alignItems="center">
                  <Bar w="2.2em" c={p.textSecondary} o={0.35} h="0.4em" />
                  <Bar w="2.2em" c={p.textSecondary} o={0.35} h="0.4em" />
                  <Box
                    sx={{
                      px: '0.9em',
                      py: '0.45em',
                      borderRadius: 99,
                      bgcolor: p.secondary,
                      color: '#fff',
                      fontSize: '0.6em',
                      fontWeight: 600,
                    }}
                  >
                    Contacto
                  </Box>
                </Stack>
              </Stack>
            }
          />

          {/* Hero */}
          <Block
            h="9.5em"
            appear={appearOf(1)}
            real={realOf(1)}
            wire={
              <Wireframe radius="0.8em">
                <Stack spacing="0.6em" sx={{ flex: 1 }}>
                  <Bar w="70%" h="0.9em" />
                  <Bar w="50%" h="0.9em" />
                  <Bar w="85%" o={0.55} />
                  <Bar w="30%" h="1.4em" o={0.7} />
                </Stack>
                <Box
                  sx={{
                    width: '5em',
                    height: '5em',
                    borderRadius: '0.6em',
                    bgcolor: WIRE_LINE,
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                />
              </Wireframe>
            }
            finished={
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  height: '100%',
                  px: '1.6em',
                  gap: '1.2em',
                  borderRadius: '0.8em',
                  bgcolor: p.darkDeep,
                  overflow: 'hidden',
                }}
              >
                <Stack spacing="0.7em" sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      fontFamily: (th) => th.typography.fontFamilyHeading,
                      fontSize: '1.9em',
                      lineHeight: 1.1,
                      color: p.onDark,
                    }}
                  >
                    Tu negocio,{' '}
                    <Box component="span" sx={{ color: p.secondary, fontStyle: 'italic' }}>
                      en línea
                    </Box>
                  </Box>
                  <Bar w="80%" c={p.onDark} o={0.3} h="0.4em" />
                  <Bar w="60%" c={p.onDark} o={0.3} h="0.4em" />
                  <Box
                    sx={{
                      alignSelf: 'flex-start',
                      mt: '0.3em',
                      px: '1.2em',
                      py: '0.6em',
                      borderRadius: 99,
                      bgcolor: p.secondary,
                      color: p.darkDeep,
                      fontSize: '0.62em',
                      fontWeight: 600,
                    }}
                  >
                    Empecemos
                  </Box>
                </Stack>
                <Box
                  sx={{
                    width: '5.2em',
                    height: '5.2em',
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: `linear-gradient(145deg, ${p.secondaryLight}, ${p.secondary})`,
                    boxShadow: `0 1em 2em -0.6em ${p.secondary}99`,
                  }}
                />
              </Stack>
            }
          />

          {/* Servicios */}
          <Block
            h="5.4em"
            appear={appearOf(2)}
            real={realOf(2)}
            wire={
              <Box
                sx={{
                  height: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75em',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      borderRadius: '0.6em',
                      bgcolor: WIRE,
                      border: '1px dashed',
                      borderColor: WIRE_LINE,
                    }}
                  />
                ))}
              </Box>
            }
            finished={
              <Box
                sx={{
                  height: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75em',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Stack
                    key={i}
                    spacing="0.45em"
                    sx={{
                      p: '0.85em',
                      borderRadius: '0.6em',
                      bgcolor: p.paper,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        width: '1.5em',
                        height: '1.5em',
                        borderRadius: '0.35em',
                        bgcolor: p.secondary,
                        opacity: 0.9 - i * 0.18,
                      }}
                    />
                    <Bar w="65%" c={p.textPrimary} o={0.75} h="0.4em" />
                    <Bar w="100%" c={p.textSecondary} o={0.28} h="0.32em" />
                    <Bar w="80%" c={p.textSecondary} o={0.28} h="0.32em" />
                  </Stack>
                ))}
              </Box>
            }
          />

          {/* Footer */}
          <Block
            h="2.4em"
            appear={appearOf(3)}
            real={realOf(3)}
            wire={
              <Wireframe>
                <Bar w="22%" o={0.6} />
                <Box sx={{ flex: 1 }} />
                <Bar w="14%" o={0.6} />
              </Wireframe>
            }
            finished={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  height: '100%',
                  px: '1.2em',
                  borderRadius: '0.6em',
                  bgcolor: p.darkDeep,
                }}
              >
                <Box
                  sx={{
                    fontFamily: (th) => th.typography.fontFamilyHeading,
                    fontSize: '0.85em',
                    color: p.onDark,
                  }}
                >
                  tu marca
                </Box>
                <Box
                  sx={{
                    fontFamily: (th) => th.typography.fontFamilyMono,
                    fontSize: '0.5em',
                    letterSpacing: '0.1em',
                    color: p.onDarkMuted,
                  }}
                >
                  HECHO POR PAIGE
                </Box>
              </Stack>
            }
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default BuildMockup;
