import type { Activity } from '../../types';
import styles from './Card.module.css';

interface Props {
  activity: Activity;
  isBack?: boolean;
}

export default function CardFace({ activity, isBack }: Props) {
  return (
    <div
      className={styles.face}
      style={isBack ? { transform: 'rotateY(180deg)' } : undefined}
    >
      <div className={styles.emoji}>{activity.emoji}</div>
      <div className={styles.title}>{activity.title}</div>
      <div className={styles.meta}>
        <span>{activity.category}</span>
        <span>{activity.budget}</span>
        <span>{activity.duration}</span>
      </div>
    </div>
  );
}
