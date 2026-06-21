# 🎯 周末活动清单

随机翻牌，决定周末去哪。支持多城市，Apple Wallet 风格 3D 翻牌动画。

## 技术栈

React 18 + TypeScript + Vite + CSS Modules + Framer Motion

纯静态前端，JSON 数据按需加载，无后端。

## 本地运行

```bash
npm install
npm run dev        # http://localhost:5173/weekendPLAN/
```

## 构建 & 部署

推送到 `main` 分支自动部署到 GitHub Pages（`.github/workflows/deploy.yml`）。

```bash
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建产物
```

需要在 GitHub 仓库 Settings → Pages → Source 选择 `gh-pages` 分支。

## 添加新城市

1. 在 `src/types.ts` 的 `CITIES` 对象中添加城市
2. 在 `src/hooks/useActivities.ts` 的 `FALLBACKS` 中添加 5 条离线回退数据
3. 创建 `public/data/<city>.json`，格式：

```json
{
  "city": "chengdu",
  "updated": "2026-06-21",
  "curator": "你的名字",
  "activities": [
    {
      "emoji": "🐼",
      "title": "大熊猫基地看花花",
      "category": "户外",
      "budget": "0-50元",
      "duration": "半天",
      "tags": ["熊猫", "户外"]
    }
  ]
}
```

## 项目结构

```
src/
├── components/
│   ├── Card/          # 3D 翻牌卡片（framer-motion spring 动画）
│   ├── CityPicker/    # 首次访问城市选择页
│   ├── CitySwitcher/  # 胶囊城市切换器
│   ├── History/       # 最近记录列表
│   ├── Particles/     # Canvas 粒子特效
│   └── Toast/         # 通知提示
├── hooks/
│   ├── useActivities  # 按城市加载 JSON + 内存缓存 + 离线回退
│   ├── useHistory     # localStorage 历史记录
│   └── useCity        # 城市偏好管理
├── context/
│   └── CityContext    # 城市状态上下文
├── App.tsx
├── App.module.css
├── index.css          # 全局变量 & 暗色主题
├── main.tsx
└── types.ts           # 共享类型 & 城市注册表

public/data/
└── shenzhen.json      # 深圳活动数据（170 条）
```
