# ART-LYC

這是一個使用 React + Vite + TypeScript 開發的專案，整合了 Tailwind CSS 4 和 Framer Motion (Motion)。

## 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 本地開發
```bash
npm run dev
```
造訪 [http://localhost:3000](http://localhost:3000) 查看結果。

### 3. 環境變數設定
複製 `.env.example` 並重新命名為 `.env`，填入對應的 API Key：
```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4. 專案打包
```bash
npm run build
```

---

## 部署流程 (GitHub Actions)

專案已設定 GitHub Actions 自動化部署：

1.  **GitHub Pages 設定**:
    *   進入 GitHub Repo > Settings > Pages。
    *   在 "Build and deployment" > "Source" 選擇 `GitHub Actions`。
2.  **設定 Secrets**:
    *   進入 GitHub Repo > Settings > Secrets and variables > Actions。
    *   新增 `GEMINI_API_KEY` 並填入你的 API Key。
3.  **觸發部署**:
    *   當你推送代碼至 `main` 分支時，系統會自動執行打包並部署到 GitHub Pages。

---

## 專案結構

- `src/`: 原始碼
  - `components/`: React 組件
  - `constants.ts`: 常數定義
  - `types.ts`: TypeScript 型別定義
  - `main.tsx`: 入口文件
- `.github/workflows/`: GitHub Actions 自動化流程配置
- `vite.config.ts`: Vite 設定檔
- `tailwind.config.js`: Tailwind CSS 設定 (如有需要)
