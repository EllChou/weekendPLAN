import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import type { Activity } from '../../types';
import type { ParticlesHandle } from '../Particles/Particles';
import CardFace from './CardFace';
import styles from './Card.module.css';

export interface CardHandle {
  spin: () => void;
}

interface Props {
  activities: Activity[];
  particlesRef: React.RefObject<ParticlesHandle | null>;
  onReveal: (activity: Activity) => void;
  onSpinStateChange: (spinning: boolean) => void;
}

const PLACEHOLDER: Activity = {
  emoji: '🎲', title: '准备好了吗？', category: '?', budget: '?', duration: '?', tags: [],
};

function pickRandom(activities: Activity[], exclude?: string): Activity {
  if (activities.length === 0) return PLACEHOLDER;
  let result: Activity;
  do {
    result = activities[Math.floor(Math.random() * activities.length)];
  } while (activities.length > 1 && result.title === exclude);
  return result;
}

const Card = forwardRef<CardHandle, Props>(function Card(
  { activities, particlesRef, onReveal, onSpinStateChange },
  ref,
) {
  const [frontActivity, setFrontActivity] = useState<Activity>(PLACEHOLDER);
  const [backActivity, setBackActivity] = useState<Activity>(PLACEHOLDER);
  const [revealed, setRevealed] = useState(false);
  const [glossActive, setGlossActive] = useState(false);

  const rotateY = useMotionValue(0);
  const spinningRef = useRef(false);
  const lastTitle = useRef('');

  const spin = async () => {
    if (spinningRef.current || activities.length === 0) return;
    spinningRef.current = true;
    onSpinStateChange(true);
    setRevealed(false);
    setGlossActive(true);

    const target = pickRandom(activities, lastTitle.current);
    lastTitle.current = target.title;

    // Phase 1+2: rapid flip then slow down, 14 flips total
    const FLIP_COUNT = 14;
    const startAngle = rotateY.get();
    let currentAngle = startAngle;

    for (let i = 0; i < FLIP_COUNT; i++) {
      const progress = i / FLIP_COUNT; // 0 → 1
      // Duration: 70ms → 500ms, ease-in slowdown
      const duration = 0.07 + progress * progress * 0.5;
      const targetAngle = currentAngle + 180;
      const midAngle = currentAngle + 90;

      let switched = false;
      // Last 1 flips: show target (not random) so the user doesn't see
      // the card "change its mind" during the slow-down phase
      const isFinalFlips = i >= FLIP_COUNT - 1;
      const act = isFinalFlips ? target : activities[Math.floor(Math.random() * activities.length)];

      await animate(rotateY, targetAngle, {
        duration,
        ease: 'linear',
        onUpdate(latest) {
          if (!switched && Math.abs(latest - midAngle) < 25) {
            switched = true;
            // Content goes on the face that WILL be visible
            if (showingFrontAtAngle(currentAngle)) {
              setBackActivity(act);
            } else {
              setFrontActivity(act);
            }
          }
        },
      });

      currentAngle = targetAngle;

      // Burst particles halfway through the spin
      if (i === Math.floor(FLIP_COUNT / 2)) {
        particlesRef.current?.burst();
      }
    }

    // Phase 3: spring reveal — settle on 0° (or nearest multiple of 360)
    const snapAngle = Math.round(currentAngle / 360) * 360;
    setGlossActive(false);
    setFrontActivity(target);

    // Ensure exact snap
    rotateY.set(snapAngle);
    setRevealed(true);
    spinningRef.current = false;
    onSpinStateChange(false);
    onReveal(target);
  };

  useImperativeHandle(ref, () => ({ spin }), [spin]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <motion.div
          className={`${styles.card} ${revealed ? styles.revealed : ''}`}
          style={{ rotateY }}
        >
          <CardFace activity={frontActivity} />
          <CardFace activity={backActivity} isBack />
          <div className={`${styles.gloss} ${glossActive ? styles.glossActive : ''}`} />
        </motion.div>
      </div>
    </div>
  );
});

function showingFrontAtAngle(angle: number): boolean {
  const normalized = ((angle % 360) + 360) % 360;
  return normalized < 90 || normalized > 270;
}

export default Card;
