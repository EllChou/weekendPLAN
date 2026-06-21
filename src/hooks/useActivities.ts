import { useState, useEffect } from 'react';
import { useCity } from './useCity';
import type { Activity } from '../types';

const FALLBACKS: Record<string, Activity[]> = {
  shenzhen: [
    { emoji: '🏔️', title: '梧桐山登顶', category: '户外', budget: '免费', duration: '半天', tags: ['爬山'] },
    { emoji: '🍜', title: '蛇口老街美食', category: '美食', budget: '50-200元', duration: '半天', tags: ['美食'] },
    { emoji: '🎨', title: '看一场展览', category: '文艺', budget: '免费', duration: '半天', tags: ['展览'] },
    { emoji: '📚', title: '书店泡半天', category: '文艺', budget: '免费', duration: '半天', tags: ['阅读'] },
    { emoji: '🚴', title: '深圳湾骑行', category: '户外', budget: '免费', duration: '半天', tags: ['骑行'] },
  ],
  chengdu: [
    { emoji: '🐼', title: '大熊猫基地看花花', category: '户外', budget: '0-50元', duration: '半天', tags: ['熊猫'] },
    { emoji: '🍲', title: '吃一顿地道火锅', category: '美食', budget: '50-200元', duration: '1-2小时', tags: ['火锅'] },
    { emoji: '🏯', title: '宽窄巷子逛一圈', category: '漫游', budget: '免费', duration: '半天', tags: ['古街'] },
    { emoji: '🍵', title: '人民公园喝盖碗茶', category: '休闲', budget: '0-50元', duration: '半天', tags: ['茶馆'] },
    { emoji: '🎭', title: '川剧变脸', category: '文艺', budget: '50-200元', duration: '1-2小时', tags: ['川剧'] },
  ],
  chongqing: [
    { emoji: '🏙️', title: '洪崖洞看夜景', category: '漫游', budget: '免费', duration: '半天', tags: ['夜景'] },
    { emoji: '🍜', title: '吃一碗地道小面', category: '美食', budget: '0-50元', duration: '1-2小时', tags: ['小面'] },
    { emoji: '🚡', title: '长江索道过江', category: '漫游', budget: '0-50元', duration: '1-2小时', tags: ['索道'] },
    { emoji: '🏞️', title: '磁器口古镇逛吃', category: '漫游', budget: '免费', duration: '半天', tags: ['古镇'] },
    { emoji: '🌶️', title: '南山一棵树看全景', category: '户外', budget: '0-50元', duration: '半天', tags: ['观景'] },
  ],
  ningbo: [
    { emoji: '🏯', title: '天一阁藏书楼', category: '文艺', budget: '0-50元', duration: '半天', tags: ['古建'] },
    { emoji: '🌊', title: '东钱湖骑行', category: '户外', budget: '免费', duration: '半天', tags: ['骑行'] },
    { emoji: '🍜', title: '南塘老街吃汤圆', category: '美食', budget: '0-50元', duration: '半天', tags: ['小吃'] },
    { emoji: '🏖️', title: '象山石浦看海', category: '出游', budget: '200元+', duration: '全天', tags: ['海滩'] },
    { emoji: '🏛️', title: '宁波博物馆', category: '文艺', budget: '免费', duration: '半天', tags: ['博物馆'] },
  ],
};

const cache = new Map<string, Activity[]>();

export function useActivities(): Activity[] {
  const { city } = useCity();
  const [activities, setActivities] = useState<Activity[]>(() => cache.get(city) ?? []);

  useEffect(() => {
    // Return cached data immediately
    if (cache.has(city)) {
      setActivities(cache.get(city)!);
      return;
    }

    let cancelled = false;

    fetch(`${import.meta.env.BASE_URL}data/${city}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { activities: Activity[] }) => {
        if (!cancelled) {
          cache.set(city, data.activities);
          setActivities(data.activities);
        }
      })
      .catch(() => {
        const fallback = FALLBACKS[city] ?? FALLBACKS.shenzhen;
        if (!cancelled) {
          cache.set(city, fallback);
          setActivities(fallback);
        }
      });

    return () => { cancelled = true; };
  }, [city]);

  return activities;
}
