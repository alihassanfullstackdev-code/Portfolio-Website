import { useEffect, useMemo, useRef, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { brandColors, prefersReducedMotion } from '../../lib/motion';

interface Ball {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  radius: number;
  label: string;
}

function labelTexture(text: string, color: string) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${text.length > 6 ? 44 : 54}px Archivo, system-ui, sans-serif`;
  ctx.fillText(text, size / 2, size / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function Balls({ labels, pointer }: { labels: string[]; pointer: RefObject<THREE.Vector2 | null> }) {
  const viewport = useThree((s) => s.viewport);
  const group = useRef<THREE.Group>(null);
  const still = useRef(prefersReducedMotion());
  const palette = useMemo(() => Object.values(brandColors()), []);
  const tall = viewport.aspect < 0.9;

  const balls = useMemo<Ball[]>(
    () =>
      labels.map((label, i) => {
        const angle = (i / labels.length) * Math.PI * 2;
        const ring = 1.5 + (i % 3) * 0.7;
        return {
          label,
          radius: (0.72 + ((i * 7) % 4) * 0.09) * (window.innerWidth < 640 ? 0.72 : 1),
          pos: new THREE.Vector3(Math.cos(angle) * ring * 1.6, Math.sin(angle) * ring, 0),
          vel: new THREE.Vector3(),
        };
      }),
    [labels],
  );

  const textures = useMemo(
    () => labels.map((label, i) => labelTexture(label, '#120d14')),
    [labels],
  );
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);
    const steps = still.current ? 0 : 2;
    const dt = delta / 2;
    const scratch = new THREE.Vector3();

    for (let s = 0; s < steps; s++) {
      balls.forEach((b) => {
        // Pull toward the middle: a wide cluster on desktop, a tall one on phones.
        b.vel.x += -b.pos.x * (tall ? 5.2 : 2.1) * dt;
        b.vel.y += -b.pos.y * (tall ? 1.7 : 4.2) * dt;

        const p = pointer.current;
        if (p) {
          scratch.set((p.x * viewport.width) / 2, (p.y * viewport.height) / 2, 0).sub(b.pos);
          const dist = Math.max(scratch.length(), 0.001);
          const reach = b.radius + 1.3;
          if (dist < reach) b.vel.addScaledVector(scratch.normalize(), (-46 * (1 - dist / reach)) * dt);
        }
        b.vel.multiplyScalar(Math.exp(-2.6 * dt));
        b.pos.addScaledVector(b.vel, dt);
      });

      // Push overlapping balls apart.
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i];
          const b = balls[j];
          scratch.subVectors(b.pos, a.pos);
          const dist = Math.max(scratch.length(), 0.001);
          const overlap = a.radius + b.radius + 0.02 - dist;
          if (overlap > 0) {
            scratch.multiplyScalar(overlap / dist / 2);
            a.pos.sub(scratch);
            b.pos.add(scratch);
            a.vel.addScaledVector(scratch, -3);
            b.vel.addScaledVector(scratch, 3);
          }
        }
      }
    }

    group.current?.children.forEach((child, i) => child.position.copy(balls[i].pos));
  });

  return (
    <group ref={group}>
      {balls.map((b, i) => (
        <group key={b.label} scale={b.radius}>
          <mesh>
            <sphereGeometry args={[1, 48, 32]} />
            <meshPhysicalMaterial
              color={palette[i % 3]}
              roughness={0.32}
              clearcoat={0.7}
              clearcoatRoughness={0.3}
            />
          </mesh>
          <mesh renderOrder={1}>
            <planeGeometry args={[1.7, 1.7]} />
            <meshBasicMaterial map={textures[i]} transparent depthWrite={false} depthTest={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function TechBalls({ labels, active }: { labels: string[]; active: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef<THREE.Vector2 | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = wrap.current?.getBoundingClientRect();
      if (!rect) return;
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) {
        pointer.current = null;
        return;
      }
      pointer.current ??= new THREE.Vector2();
      pointer.current.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -(((e.clientY - rect.top) / rect.height) * 2 - 1));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div ref={wrap} className="h-full w-full" style={{ pointerEvents: 'none' }}>
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 14], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 8]} intensity={2.2} color="#fff1df" />
        <directionalLight position={[-6, -3, 4]} intensity={0.7} color="#c9a8d8" />
        <Balls labels={labels} pointer={pointer} />
      </Canvas>
    </div>
  );
}
