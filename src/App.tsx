import { useRef, useState, useCallback } from 'react';
import { CityProvider } from './context/CityContext';
import { useCity } from './hooks/useCity';
import { useActivities } from './hooks/useActivities';
import { useHistory } from './hooks/useHistory';
import CityPicker from './components/CityPicker/CityPicker';
import CitySwitcher from './components/CitySwitcher/CitySwitcher';
import Card, { type CardHandle } from './components/Card/Card';
import Particles, { type ParticlesHandle } from './components/Particles/Particles';
import HistoryList from './components/History/History';
import Toast, { type ToastHandle } from './components/Toast/Toast';
import type { Activity } from './types';
import styles from './App.module.css';

function hasVisitedBefore(): boolean {
  try {
    return !!localStorage.getItem('weekendplan_city');
  } catch {
    return false;
  }
}

function MainView() {
  const { city } = useCity();
  const activities = useActivities();
  const { cityHistory, addEntry } = useHistory(city);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const cardRef = useRef<CardHandle>(null);
  const particlesRef = useRef<ParticlesHandle | null>(null);
  const toastRef = useRef<ToastHandle>(null);

  const handleReveal = useCallback((act: Activity) => {
    setCurrentActivity(act);
  }, []);

  const handleSpinClick = useCallback(() => {
    cardRef.current?.spin();
  }, []);

  const showToast = useCallback((msg: string) => {
    toastRef.current?.show(msg);
  }, []);

  const markDone = useCallback(() => {
    if (!currentActivity) return;
    const d = new Date();
    const dateStr = `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    addEntry({ date: dateStr, title: currentActivity.title, emoji: currentActivity.emoji, status: 'done' });
    showToast('✅ 已标记完成');
  }, [currentActivity, addEntry, showToast]);

  const markSkip = useCallback(() => {
    if (!currentActivity) return;
    const d = new Date();
    const dateStr = `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    addEntry({ date: dateStr, title: currentActivity.title, emoji: currentActivity.emoji, status: 'skipped' });
    showToast('⏭️ 已跳过');
  }, [currentActivity, addEntry, showToast]);

  const shareResult = useCallback(async () => {
    if (!currentActivity) return;
    const text = `🎯 周末活动清单帮我选到了：${currentActivity.emoji} ${currentActivity.title}！${currentActivity.category} · ${currentActivity.budget} · ${currentActivity.duration}`;
    if (navigator.share) {
      try { await navigator.share({ title: '周末活动清单', text }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(text);
      showToast('📋 已复制到剪贴板');
    } catch {
      showToast('分享失败，请截图分享吧');
    }
  }, [currentActivity, showToast]);

  const categories = [...new Set(activities.map(a => a.category))];

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>🎯 周末活动清单</h1>
      <p className={styles.subtitle}>SHENZHEN EDITION</p>
      <CitySwitcher />
      <Particles particlesRef={particlesRef} />
      <Card
        ref={cardRef}
        activities={activities}
        particlesRef={particlesRef}
        onReveal={handleReveal}
        onSpinStateChange={setIsSpinning}
      />
      <button
        className={styles.btnPrimary}
        onClick={handleSpinClick}
        disabled={isSpinning || activities.length === 0}
      >
        {isSpinning ? '🎰 翻牌中...' : '🎲 开始翻牌'}
      </button>
      {currentActivity && !isSpinning && (
        <div className={styles.actions}>
          <button className={styles.btnAction} onClick={handleSpinClick}>🔄 再来一次</button>
          <button className={styles.btnAction} onClick={shareResult}>📤 分享</button>
          <button className={styles.btnAction} onClick={markDone}>✅ 标记完成</button>
          <button className={styles.btnAction} onClick={markSkip}>⏭️ 跳过</button>
        </div>
      )}
      <p className={styles.counter}>
        共 {activities.length} 个活动 · {categories.length} 个分类
      </p>
      <HistoryList entries={cityHistory} />
      <Toast ref={toastRef} />
    </div>
  );
}

function AppContent() {
  const [showPicker, setShowPicker] = useState(!hasVisitedBefore());

  if (showPicker) {
    return <CityPicker onDone={() => setShowPicker(false)} />;
  }

  return <MainView />;
}

export default function App() {
  return (
    <CityProvider>
      <AppContent />
    </CityProvider>
  );
}
