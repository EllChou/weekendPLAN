import { CITIES } from '../../types';
import { useCity } from '../../hooks/useCity';
import styles from './CitySwitcher.module.css';

export default function CitySwitcher() {
  const { city, setCity } = useCity();

  return (
    <div className={styles.switcher}>
      {Object.entries(CITIES).map(([key, { emoji, name }]) => (
        <button
          key={key}
          className={`${styles.pill} ${key === city ? styles.active : ''}`}
          onClick={() => setCity(key)}
        >
          {emoji} {name}
        </button>
      ))}
    </div>
  );
}
