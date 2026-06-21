import type { HistoryEntry } from '../../types';
import styles from './History.module.css';

interface Props {
  entries: HistoryEntry[];
}

export default function History({ entries }: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.heading}>📋 最近记录</div>
      {entries.length === 0 ? (
        <div className={styles.empty}>还没有记录，开始你的第一次翻牌吧！</div>
      ) : (
        entries.map((h, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.date}>{h.date}</span>
            <span className={styles.title}>{h.emoji} {h.title}</span>
            <span className={styles.status}>{h.status === 'done' ? '✅' : '⏭️'}</span>
          </div>
        ))
      )}
    </div>
  );
}
