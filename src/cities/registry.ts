import type { Activity } from '../types/activity';

export interface CityRegistration {
  emoji: string;
  name: string;
  /** 5-item fallback shown when JSON fails to load */
  fallback: Activity[];
}

/**
 * City registry — single source of truth for all cities.
 *
 * To add a new city:
 * 1. Add entry below with emoji, name, and 5 fallback activities
 * 2. Add public/data/{key}.json with 100-170 curated activities
 *
 * That's it. CITIES map and FALLBACKS are derived automatically.
 */
export const CITY_REGISTRY: Record<string, CityRegistration> = {
  shenzhen: {
    emoji: '🏙️',
    name: '深圳',
    fallback: [
      { emoji: '🏔️', title: '梧桐山登顶', category: '户外', budget: '免费', duration: '半天', tags: ['爬山'] },
      { emoji: '🍜', title: '蛇口老街美食', category: '美食', budget: '50-200元', duration: '半天', tags: ['美食'] },
      { emoji: '🎨', title: '看一场展览', category: '文艺', budget: '免费', duration: '半天', tags: ['展览'] },
      { emoji: '📚', title: '书店泡半天', category: '文艺', budget: '免费', duration: '半天', tags: ['阅读'] },
      { emoji: '🚴', title: '深圳湾骑行', category: '户外', budget: '免费', duration: '半天', tags: ['骑行'] },
    ],
  },
  chengdu: {
    emoji: '🌶️',
    name: '成都',
    fallback: [
      { emoji: '🐼', title: '大熊猫基地看花花', category: '户外', budget: '0-50元', duration: '半天', tags: ['熊猫'] },
      { emoji: '🍲', title: '吃一顿地道火锅', category: '美食', budget: '50-200元', duration: '1-2小时', tags: ['火锅'] },
      { emoji: '🏯', title: '宽窄巷子逛一圈', category: '漫游', budget: '免费', duration: '半天', tags: ['古街'] },
      { emoji: '🍵', title: '人民公园喝盖碗茶', category: '休闲', budget: '0-50元', duration: '半天', tags: ['茶馆'] },
      { emoji: '🎭', title: '川剧变脸', category: '文艺', budget: '50-200元', duration: '1-2小时', tags: ['川剧'] },
    ],
  },
  chongqing: {
    emoji: '🏔️',
    name: '重庆',
    fallback: [
      { emoji: '🏙️', title: '洪崖洞看夜景', category: '漫游', budget: '免费', duration: '半天', tags: ['夜景'] },
      { emoji: '🍜', title: '吃一碗地道小面', category: '美食', budget: '0-50元', duration: '1-2小时', tags: ['小面'] },
      { emoji: '🚡', title: '长江索道过江', category: '漫游', budget: '0-50元', duration: '1-2小时', tags: ['索道'] },
      { emoji: '🏞️', title: '磁器口古镇逛吃', category: '漫游', budget: '免费', duration: '半天', tags: ['古镇'] },
      { emoji: '🌶️', title: '南山一棵树看全景', category: '户外', budget: '0-50元', duration: '半天', tags: ['观景'] },
    ],
  },
  ningbo: {
    emoji: '🌊',
    name: '宁波',
    fallback: [
      { emoji: '🏯', title: '天一阁藏书楼', category: '文艺', budget: '0-50元', duration: '半天', tags: ['古建'] },
      { emoji: '🌊', title: '东钱湖骑行', category: '户外', budget: '免费', duration: '半天', tags: ['骑行'] },
      { emoji: '🍜', title: '南塘老街吃汤圆', category: '美食', budget: '0-50元', duration: '半天', tags: ['小吃'] },
      { emoji: '🏖️', title: '象山石浦看海', category: '出游', budget: '200元+', duration: '全天', tags: ['海滩'] },
      { emoji: '🏛️', title: '宁波博物馆', category: '文艺', budget: '免费', duration: '半天', tags: ['博物馆'] },
    ],
  },
  tianjin: {
    emoji: '🎡',
    name: '天津',
    fallback: [
      { emoji: '🥞', title: '西北角吃煎饼果子', category: '美食', budget: '0-50元', duration: '半天', tags: ['煎饼果子'] },
      { emoji: '🚶', title: '五大道洋楼City Walk', category: '漫游', budget: '免费', duration: '半天', tags: ['五大道'] },
      { emoji: '🎭', title: '名流茶馆听相声', category: '文艺', budget: '50-200元', duration: '半天', tags: ['相声'] },
      { emoji: '⛰️', title: '盘山登顶', category: '户外', budget: '50-200元', duration: '全天', tags: ['盘山'] },
      { emoji: '🌉', title: '海河夜游看夜景', category: '漫游', budget: '免费', duration: '1-2小时', tags: ['夜景'] },
    ],
  },
};
