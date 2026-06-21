import { CITIES } from '../../types';
import { useCity } from '../../hooks/useCity';
import styles from './CityPicker.module.css';

interface Props {
  onDone: () => void;
}

export default function CityPicker({ onDone }: Props) {
  const { setCity } = useCity();

  const handleSelect = (key: string) => {
    setCity(key);
    onDone();
  };

  return (
    <div className={styles.overlay}>
      <p className={styles.title}>🎯 周末活动清单</p>
      <p className={styles.subtitle}>SELECT YOUR CITY</p>
      <div className={styles.list}>
        {Object.entries(CITIES).map(([key, { emoji, name }]) => (
          <button
            key={key}
            className={styles.cityCard}
            onClick={() => handleSelect(key)}
          >
            <span className={styles.cityEmoji}>{emoji}</span>
            <span className={styles.cityName}>{name}</span>
            {key === 'shenzhen' && (
              <span className={styles.cityBadge}>默认</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
