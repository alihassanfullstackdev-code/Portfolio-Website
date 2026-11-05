import { useEffect, useMemo, useRef, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { avatarScroll, brandColors, prefersReducedMotion } from '../../lib/motion';

/* An original robot: ivory shell, dark visor, glowing eyes and a chest core in the site accent. */
const SHELL = '#efe7dc';
const JOINT = '#3c2e42';
const VISOR = '#0d0910';

function Shell() {
  return <meshStandardMaterial color={SHELL} roughness={0.32} metalness={0.08} />;
}

function Joint() {
  return <meshStandardMaterial color={JOINT} roughness={0.45} metalness={0.45} />;
}

function Visor() {
  return <meshStandardMaterial color={VISOR} roughness={0.16} metalness={0.5} />;
}

function Glow({ color }: { color: string }) {
  return <meshBasicMaterial color={color} toneMapped={false} />;
}

type Palette = ReturnType<typeof brandColors>;

function Head({ eyes, colors, beacon }: { eyes: RefObject<THREE.Group | null>; colors: Palette; beacon: RefObject<THREE.Mesh | null> }) {
  const smile = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([new THREE.Vector3(-0.22, -0.2, 0), new THREE.Vector3(-0.1, -0.29, 0), new THREE.Vector3(0.1, -0.29, 0), new THREE.Vector3(0.22, -0.2, 0)]),
        24,
        0.024,
        8,
        false,
      ),
    [],
  );

  return (
    <>
      <RoundedBox args={[2.2, 1.76, 1.72]} radius={0.5} smoothness={8}>
        <Shell />
      </RoundedBox>

      {/* visor with eyes and mouth */}
      <RoundedBox args={[1.78, 1.12, 0.14]} radius={0.06} smoothness={6} position={[0, -0.02, 0.81]}>
        <Visor />
      </RoundedBox>
      <group position={[0, 0.02, 0.9]}>
        <group ref={eyes}>
          {[1, -1].map((s) => (
            <mesh key={s} position={[s * 0.42, 0.14, 0]}>
              <capsuleGeometry args={[0.1, 0.1, 8, 20]} />
              <Glow color={colors.lime} />
            </mesh>
          ))}
        </group>
        <mesh geometry={smile}>
          <Glow color={colors.lime} />
        </mesh>
      </group>

      {/* side discs */}
      {[1, -1].map((s) => (
        <group key={s} position={[s * 1.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.36, 0.36, 0.16, 40]} />
            <Joint />
          </mesh>
          <mesh position={[0, s * -0.09, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.03, 32]} />
            <Glow color={colors.coral} />
          </mesh>
        </group>
      ))}

      {/* antenna */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 0.42, 16]} />
        <Joint />
      </mesh>
      <mesh ref={beacon} position={[0, 1.38, 0]}>
        <sphereGeometry args={[0.1, 24, 16]} />
        <Glow color={colors.sky} />
      </mesh>
    </>
  );
}

function Body({ colors, core }: { colors: Palette; core: RefObject<THREE.Mesh | null> }) {
  return (
    <>
      {/* neck rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -1.02 - i * 0.13, 0]}>
          <cylinderGeometry args={[0.42 + i * 0.05, 0.42 + i * 0.05, 0.09, 40]} />
          <Joint />
        </mesh>
      ))}

      <RoundedBox args={[2.9, 3.2, 1.84]} radius={0.72} smoothness={8} position={[0, -2.96, 0]}>
        <Shell />
      </RoundedBox>

      {/* chest panel and core */}
      <RoundedBox args={[1.5, 1.04, 0.1]} radius={0.05} smoothness={6} position={[0, -2.32, 0.92]}>
        <Visor />
      </RoundedBox>
      <mesh ref={core} position={[-0.32, -2.32, 0.99]}>
        <circleGeometry args={[0.2, 40]} />
        <Glow color={colors.coral} />
      </mesh>
      <mesh position={[-0.32, -2.32, 0.99]}>
        <torusGeometry args={[0.29, 0.024, 12, 56]} />
        <Glow color={colors.lime} />
      </mesh>
      {[0.22, 0, -0.22].map((y, i) => (
        <mesh key={y} position={[0.36 - (2 - i) * 0.0, -2.32 + y, 0.985]}>
          <planeGeometry args={[0.56 - i * 0.14, 0.05]} />
          <Glow color={[colors.lime, colors.coral, colors.sky][i]} />
        </mesh>
      ))}

      {/* shoulders and arms */}
      {[1, -1].map((s) => (
        <group key={s}>
          <mesh position={[s * 1.68, -1.96, 0]}>
            <sphereGeometry args={[0.36, 32, 24]} />
            <Joint />
          </mesh>
          <mesh position={[s * 1.88, -2.92, 0.02]} rotation={[0, 0, s * 0.1]}>
            <capsuleGeometry args={[0.33, 1.3, 12, 24]} />
            <Shell />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Robot({ pointer }: { pointer: RefObject<THREE.Vector2> }) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const beacon = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const still = useRef(prefersReducedMotion());
  const blink = useRef({ next: 2, until: 0 });
  const eased = useRef(new THREE.Vector2());
  const home = useMemo(() => new THREE.Vector2(), []);
  const colors = useMemo(brandColors, []);
  const aspect = useThree((s) => s.viewport.aspect);
  const narrow = aspect < 0.8;

  useFrame((state, delta) => {
    if (!root.current || !head.current || !body.current || !eyes.current) return;
    const t = state.clock.elapsedTime;
    eased.current.lerp(still.current ? home : pointer.current, 1 - Math.exp(-delta * 5));
    const { x, y } = eased.current;
    const { slide, dock } = avatarScroll;
    const { width, height } = state.viewport;

    // Rise in on load, then the scroll position takes over.
    const entrance = still.current ? 1 : THREE.MathUtils.smoothstep(t, 0, 1.2);
    const lerp = THREE.MathUtils.lerp;
    const stageY = (narrow ? 0.16 : 0.24) - slide * 0.08;
    root.current.position.set(
      lerp(slide * 1.75, width / 2 - (narrow ? 0.25 : 0.4), dock),
      lerp(stageY, -height / 2 + (narrow ? 0.42 : 0.52), dock) - (1 - entrance) * 1.2,
      0,
    );
    root.current.rotation.y = lerp(-slide * 0.42, -0.34, dock);
    root.current.scale.setScalar(lerp(narrow ? 0.54 : 0.74, narrow ? 0.14 : 0.17, dock));

    head.current.rotation.y = x * 0.5;
    head.current.rotation.x = -y * 0.22;
    head.current.rotation.z = -x * 0.05;
    body.current.rotation.y = x * 0.12;

    if (!still.current) {
      body.current.position.y = Math.sin(t * 1.6) * 0.02;
      head.current.position.y = Math.sin(t * 1.6 - 0.4) * 0.016;
      const pulse = 1 + Math.sin(t * 2.4) * 0.09;
      core.current?.scale.setScalar(pulse);
      beacon.current?.scale.setScalar(2 - pulse);
    }

    eyes.current.position.set(x * 0.12, y * 0.07, 0);

    // Blink: flatten the eyes for a few frames every couple of seconds.
    if (t > blink.current.next) {
      blink.current.until = t + 0.12;
      blink.current.next = t + 2.2 + Math.random() * 3;
    }
    const closing = t < blink.current.until;
    eyes.current.scale.y = THREE.MathUtils.lerp(eyes.current.scale.y, closing ? 0.1 : 1, 0.5);
  });

  return (
    <group ref={root}>
      <group ref={body}>
        <Body colors={colors} core={core} />
        <group ref={head}>
          <Head eyes={eyes} colors={colors} beacon={beacon} />
        </group>
      </group>
    </group>
  );
}

function Lights() {
  const { lime, coral } = brandColors();
  return (
    <>
      <ambientLight intensity={0.5} color="#e6dcd8" />
      <directionalLight position={[2.5, 3.5, 6]} intensity={1.9} color="#fff4e6" />
      <directionalLight position={[-5, 1, 3]} intensity={0.6} color="#c9a8d8" />
      {/* lime and coral rim from behind */}
      <pointLight position={[-3.2, 0.4, -2.4]} intensity={30} color={lime} />
      <pointLight position={[3.2, -1, -2.4]} intensity={30} color={coral} />
    </>
  );
}

export default function Avatar() {
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, window.innerWidth < 768 ? 1.5 : 1.75]}
      camera={{ position: [0, 0, 7.4], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <Lights />
      <Robot pointer={pointer} />
    </Canvas>
  );
}
