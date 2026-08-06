import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { config } from '../../config.js';

const { secondary, secondaryLight, onDark, primaryLight } = config.palette;

/**
 * Núcleo: icosaedro subdividido con material que se deforma en el vertex
 * shader. El detalle baja en mobile para no castigar la GPU.
 */
const Core = ({ detail }) => {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const m = mesh.current;
    if (!m) return;
    m.rotation.y = t * 0.14;
    m.rotation.z = Math.sin(t * 0.25) * 0.12;
    // Respira levemente para que nunca se vea congelado
    m.scale.setScalar(1 + Math.sin(t * 0.7) * 0.025);
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.45, detail]} />
      <MeshDistortMaterial
        color={secondary}
        distort={0.4}
        speed={1.3}
        roughness={0.16}
        metalness={0.5}
      />
    </mesh>
  );
};

/** Jaula de alambre que contrarrota — le da profundidad al núcleo. */
const Cage = () => {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const m = mesh.current;
    if (!m) return;
    m.rotation.y = -t * 0.08;
    m.rotation.x = t * 0.04;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2.25, 1]} />
      <meshBasicMaterial
        color={primaryLight}
        wireframe
        transparent
        opacity={0.28}
      />
    </mesh>
  );
};

/** Piezas satélite: sugieren "bloques" de una página flotando. */
const Satellites = () => (
  <>
    <Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.4}>
      <mesh position={[2.6, 1.15, -0.6]}>
        <torusGeometry args={[0.34, 0.1, 16, 48]} />
        <meshStandardMaterial color={onDark} roughness={0.35} metalness={0.25} />
      </mesh>
    </Float>

    <Float speed={2.1} rotationIntensity={1.4} floatIntensity={1.1}>
      <mesh position={[-2.7, -1.05, 0.5]} rotation={[0.5, 0.8, 0.2]}>
        <boxGeometry args={[0.46, 0.46, 0.46]} />
        <meshStandardMaterial
          color={secondaryLight}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
    </Float>

    <Float speed={1.3} rotationIntensity={0.9} floatIntensity={1.6}>
      <mesh position={[2.05, -1.55, 0.9]}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color={onDark} roughness={0.25} metalness={0.5} />
      </mesh>
    </Float>
  </>
);

/** Grupo contenedor: sigue el mouse con inercia. */
const Rig = ({ children }) => {
  const group = useRef();
  const eased = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const k = Math.min(1, delta * 2.5);
    eased.current.x += (state.pointer.x - eased.current.x) * k;
    eased.current.y += (state.pointer.y - eased.current.y) * k;
    g.rotation.y = eased.current.x * 0.45;
    g.rotation.x = -eased.current.y * 0.3;
    g.position.x = eased.current.x * 0.25;
  });

  return <group ref={group}>{children}</group>;
};

const HeroScene = ({ compact = false }) => {
  const wrapper = useRef();
  // Solo dibujamos mientras el hero está en pantalla.
  const [active, setActive] = useState(true);

  useEffect(() => {
    const node = wrapper.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} style={{ width: '100%', height: '100%' }}>
      <Canvas
        frameloop={active ? 'always' : 'demand'}
        dpr={[1, compact ? 1.5 : 1.9]}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 4]} intensity={2.4} color="#FFF6EA" />
        <pointLight
          position={[-5, -2, -3]}
          intensity={45}
          color={secondary}
          decay={2}
        />
        <pointLight position={[5, -4, 3]} intensity={26} color="#8FA9C9" decay={2} />

        <Rig>
          <Core detail={compact ? 10 : 16} />
          <Cage />
          <Satellites />
        </Rig>
      </Canvas>
    </div>
  );
};

export default HeroScene;
