import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import styles from './Toast.module.css';

export interface ToastHandle {
  show: (msg: string) => void;
}

const Toast = forwardRef<ToastHandle>(function Toast(_props, ref) {
  const elRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useImperativeHandle(ref, () => ({
    show(msg: string) {
      const el = elRef.current;
      if (!el) return;
      el.textContent = msg;
      el.classList.add(styles.show);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        el.classList.remove(styles.show);
      }, 2000);
    },
  }));

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return <div ref={elRef} className={styles.toast} />;
});

export default Toast;
