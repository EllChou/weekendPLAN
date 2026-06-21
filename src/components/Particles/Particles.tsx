import { useRef, useEffect, useCallback } from 'react';
import styles from './Particles.module.css';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  color: string;
  life: number;
  decay: number;
}

const COLORS = ['#C8956C', '#D4A574', '#E0B88A', '#B8845A', '#D4AC7A', '#EBE5D9'];

export interface ParticlesHandle {
  burst: () => void;
}

interface Props {
  particlesRef: React.RefObject<ParticlesHandle | null>;
}

export default function Particles({ particlesRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const burst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const particles: Particle[] = [];

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
        decay: 0.015 + Math.random() * 0.025,
      });
    }

    cancelAnimationFrame(animRef.current);
    let frame = 0;

    function draw() {
      if (frame > 50 || particles.every(p => p.life <= 0)) {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        return;
      }
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= p.decay;
        if (p.life > 0) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fillStyle = p.color;
          ctx!.globalAlpha = p.life;
          ctx!.fill();
        }
      });
      ctx!.globalAlpha = 1;
      frame++;
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
  }, []);

  useEffect(() => {
    (particlesRef as React.MutableRefObject<ParticlesHandle | null>).current = { burst };
    return () => cancelAnimationFrame(animRef.current);
  }, [burst, particlesRef]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      width={300}
      height={360}
    />
  );
}
