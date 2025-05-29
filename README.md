# Vue Express App

一個使用 Vue 3 + Express.js 建立的全端網頁應用程式，具備現代化的開發工具鏈和資料庫管理功能。

## 專案架構

```makefile
vue-express-app/
├── client/                   
│   ├── public/                # 靜態資源
│   ├── src/                   # 主要程式碼
│   │   ├── App.vue            # 根組件
│   │   ├── main.js            # 應用程式入口點
│   │   ├── assets/            # 靜態資源 (圖片、樣式等)
│   │   ├── components/        # 可重用組件
│   │   ├── views/             # 頁面組件
│   │   ├── router/            # 路由配置
│   │   └── stores/            # Pinia 狀態管理
│   ├── index.html             
│   ├── package.json           
│   ├── vite.config.js         
│   ├── tailwind.config.js     
│   ├── postcss.config.js      
│   ├── eslint.config.js       
│   └── jsconfig.json          
│
└── server/                    
    ├── src/                   
    │   ├── app.js             
    │   ├── server.js          
    │   ├── config/            
    │   │   ├── database.js    
    │   │   └── env.js         
    │   ├── controllers/       # 控制器 (處理 HTTP 請求)
    │   │   ├── messageController.js
    │   │   └── generalController.js
    │   ├── routes/            
    │   │   ├── index.js       
    │   │   ├── messageRoutes.js
    │   │   └── generalRoutes.js
    │   ├── services/          
    │   │   └── messageService.js
    │   ├── middleware/        
    │   │   ├── errorHandler.js
    │   │   └── logger.js
    │   └── utils/             
    │       └── logger.js
    ├── db/                    # 資料庫相關
    │   ├── index.js           
    │   └── schema.js          
    ├── drizzle/               
    │   └── meta/              
    ├── seeds/                 
    │   ├── messageSeeds.js    # 手動訊息 seeds
    │   ├── fakerSeeds.js      # Faker 隨機訊息 seeds
    │   └── messageTemplates.json 
    ├── scripts/               # 腳本檔案
    │   └── init-db.js         
    ├── package.json           
    ├── drizzle.config.js      
    ├── .env.example           
    └── .env                   
```

## 技術棧

### 前端 (Client)

- **框架**: Vue 3 + Composition API
- **建構工具**: Vite
- **路由**: Vue Router 4
- **狀態管理**: Pinia
- **樣式**: Tailwind CSS 3
- **HTTP 客戶端**: Axios
- **程式碼品質**: ESLint + Prettier

### 後端 (Server)

- **框架**: Express.js
- **ORM**: Drizzle ORM
- **資料庫**: PostgreSQL
- **測試資料**: Faker.js
- **環境變數**: dotenv

## 環境需求

- Node.js 18+
- PostgreSQL 12+
- pnpm

## 快速開始

### 1. 安裝依賴套件

```bash
# 安裝前端依賴
cd client
pnpm install

# 安裝後端依賴
cd ../server
pnpm install
```

### 2. 設定後端環境

複製環境變數範例檔案：

```bash
cd server
cp .env.example .env
```

編輯 `.env` 檔案，設定您的 PostgreSQL 連線資訊：

```env
# PostgreSQL 資料庫連線設定
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vue_express_app
DB_USER=your_username
DB_PASSWORD=your_password

# 伺服器設定
PORT=3002
```

### 3. 建立並初始化資料庫

```bash
# 在 PostgreSQL 中建立資料庫
createdb vue_express_app

# 執行資料庫 migration
cd server
pnpm db:migrate
```

### 4. 啟動開發伺服器

開啟兩個終端視窗：

```bash
# 終端 1: 啟動後端伺服器 (http://localhost:3002)
cd server
pnpm dev

# 終端 2: 啟動前端開發伺服器 (http://localhost:5173)
cd client
pnpm dev
```

## 可用腳本

### 前端 (Client)

```bash
pnpm dev      # 啟動開發伺服器
pnpm build    # 建構生產版本
pnpm preview  # 預覽生產版本
pnpm lint     # 執行 ESLint 檢查
pnpm format   # 格式化程式碼
```

### 後端 (Server)

```bash
# 伺服器相關
pnpm start    # 啟動生產伺服器
pnpm dev      # 啟動開發伺服器（支援熱重載）

# 資料庫相關
pnpm db:init      # 初始化資料庫
pnpm db:generate  # 生成 migration 檔案
pnpm db:migrate   # 執行 migration
pnpm db:studio    # 開啟 Drizzle Studio

# 測試資料生成
pnpm seed:messages:all    # 插入所有分類的訊息
pnpm seed:messages:clear  # 清空所有訊息資料
pnpm seed:faker:fake      # 產生隨機測試資料
```

## 資料庫備份與還原

### 使用 pg_dump 進行資料庫備份與匯入

```bash
# 匯出整個資料庫（包含結構和資料）
pg_dump -h localhost -p 5432 -U your_username -d vue_express_app -f backup.sql

# 或使用
pg_dump -h localhost -p 5432 -U your_username -d vue_express_app > backup.sql
```

```bash
# 使用 psql（資料庫必須已存在，且是空的）
psql -h localhost -p 5432 -U your_username -d vue_express_app < backup.sql
```

## API 端點

### 一般端點

- `GET /` - 伺服器資訊
- `GET /api/hello` - 健康檢查
- `GET /api/time` - 取得當前時間

### 訊息端點

- `GET /api/messages` - 取得所有訊息
- `GET /api/messages/:id` - 取得單一訊息
- `POST /api/messages` - 新增訊息
- `PUT /api/messages/:id` - 更新訊息
- `DELETE /api/messages/:id` - 刪除訊息

## 開發工具

### 推薦的 IDE 設定

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Vue 3 支援)
- 停用 Vetur 擴充功能

### 資料庫管理

使用 Drizzle Studio 來管理資料庫：

```bash
cd server
pnpm db:studio
```

## 部署

### 前端部署

```bash
cd client
pnpm build
# 將 dist/ 目錄部署到靜態檔案伺服器
```

### 後端部署

```bash
cd server
# 設定生產環境變數
# 執行資料庫 migration
pnpm db:migrate
# 啟動伺服器
pnpm start
```
