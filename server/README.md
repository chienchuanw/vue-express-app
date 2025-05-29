# Vue Express App - 後端伺服器

使用 Express.js 和 Drizzle ORM 建立的後端 API 伺服器，連接到 PostgreSQL 資料庫。

## 環境需求

- Node.js 18+
- PostgreSQL 12+
- pnpm

## 安裝與設定

### 1. 安裝依賴套件

```bash
pnpm install
```

#### 可選：安裝 Faker.js（用於產生隨機測試資料）

如果你需要使用 Faker 產生隨機測試資料，可以安裝 Faker.js：

```bash
pnpm add @faker-js/faker
```

**注意**：Faker.js 已經包含在專案依賴中，通常不需要手動安裝。

### 2. 設定環境變數

複製 `.env.example` 為 `.env` 並填入您的資料庫設定：

```bash
cp .env.example .env
```

編輯 `.env` 檔案：

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

### 3. 建立資料庫

在 PostgreSQL 中建立資料庫：

```sql
CREATE DATABASE vue_express_app;
```

### 4. 執行資料庫 Migration

```bash
# 生成 migration 檔案（如果 schema 有變更）
pnpm db:generate

# 執行 migration（推薦）
pnpm db:migrate

# 或者使用初始化腳本（使用 Drizzle ORM migration）
pnpm db:init
```

**注意**：`pnpm db:init` 腳本已改用 Drizzle ORM 的 migration 功能，而非 raw SQL，確保與 ORM 的一致性。

### 5. 啟動伺服器

```bash
pnpm server
```

## 可用的腳本

### 伺服器相關

- `pnpm start` - 啟動生產伺服器
- `pnpm dev` - 啟動開發伺服器（支援熱重載）
- `pnpm server` - 啟動伺服器（別名）

### 資料庫相關

- `pnpm db:init` - 初始化資料庫（建立資料表）
- `pnpm db:generate` - 生成 migration 檔案
- `pnpm db:migrate` - 執行 migration
- `pnpm db:studio` - 開啟 Drizzle Studio（資料庫管理介面）

### 測試資料生成（Seeds）

#### 手動訊息 Seeds（使用預定義模板）

- `pnpm seed:messages:all` - 插入所有分類的訊息
- `pnpm seed:messages:clear` - 清空所有訊息資料
- `pnpm seed:messages:categories` - 查看可用的訊息分類

#### Faker 隨機訊息 Seeds（使用 Faker.js 產生）

- `pnpm seed:faker:fake` - 產生 10 則混合類型隨機訊息
- `pnpm seed:faker:tech` - 產生 20 則技術類型訊息
- `pnpm seed:faker:personal` - 產生 15 則個人生活訊息
- `pnpm seed:faker:bulk` - 產生 100 則大量測試資料
- `pnpm seed:faker:clear` - 清空所有訊息資料
- `pnpm seed:faker:types` - 查看可用的 Faker 訊息類型

#### Seeds 進階用法

你也可以直接使用 Node.js 執行 seeds 檔案：

##### 手動訊息 Seeds

```bash
# 插入所有分類的訊息
node seeds/messageSeeds.js all

# 插入指定分類的訊息
node seeds/messageSeeds.js greetings
node seeds/messageSeeds.js technology
node seeds/messageSeeds.js daily

# 查看所有分類
node seeds/messageSeeds.js categories

# 清空所有訊息
node seeds/messageSeeds.js clear
```

**可用分類：** greetings, daily, technology, lifestyle, learning, emotions, work, hobbies, motivation, thoughts

##### Faker 隨機訊息 Seeds

```bash
# 產生隨機訊息（預設 10 則混合類型）
node seeds/fakerSeeds.js fake

# 產生指定數量和類型的訊息
node seeds/fakerSeeds.js fake 20 tech        # 20 則技術類型
node seeds/fakerSeeds.js fake 15 personal    # 15 則個人生活
node seeds/fakerSeeds.js fake 30 company     # 30 則公司相關
node seeds/fakerSeeds.js fake 25 social      # 25 則社交相關

# 產生大量測試資料
node seeds/fakerSeeds.js bulk 500            # 500 則混合類型

# 查看可用的 Faker 類型
node seeds/fakerSeeds.js types

# 清空所有訊息
node seeds/fakerSeeds.js clear
```

**可用的 Faker 類型：** quote, company, personal, tech, social, work, mixed

## API 端點

### 一般端點

- `GET /` - 伺服器資訊
- `GET /api/hello` - 健康檢查端點
- `GET /api/time` - 取得當前時間
- `GET /api/info` - API 資訊

### 訊息端點

- `GET /api/messages` - 取得所有訊息
- `GET /api/messages/:id` - 取得單一訊息
- `POST /api/messages` - 新增訊息
- `PUT /api/messages/:id` - 更新訊息
- `DELETE /api/messages/:id` - 刪除訊息

## 專案結構

```text
server/
├── src/                    # 主要程式碼
│   ├── app.js             # Express 應用程式配置
│   ├── server.js          # 伺服器啟動檔案
│   ├── config/            # 配置檔案
│   │   ├── database.js    # 資料庫配置
│   │   └── env.js         # 環境變數配置
│   ├── controllers/       # 控制器
│   │   ├── messageController.js
│   │   └── generalController.js
│   ├── routes/            # 路由定義
│   │   ├── index.js       # 主要路由
│   │   ├── messageRoutes.js
│   │   └── generalRoutes.js
│   ├── services/          # 業務邏輯
│   │   └── messageService.js
│   ├── middleware/        # 中介軟體
│   │   ├── errorHandler.js
│   │   └── logger.js
│   └── utils/             # 工具函式
│       └── logger.js
├── db/                    # 資料庫 Schema
│   └── schema.js
├── drizzle/               # Migration 檔案
├── seeds/                 # 測試資料生成
│   ├── messageSeeds.js    # 手動訊息 seeds
│   ├── fakerSeeds.js      # Faker 隨機訊息 seeds
│   └── messageTemplates.json # 訊息模板資料
├── scripts/               # 腳本檔案
│   └── init-db.js
├── package.json
├── drizzle.config.js
└── README.md
```

## 技術棧

- **框架**: Express.js
- **ORM**: Drizzle ORM
- **資料庫**: PostgreSQL
- **測試資料**: Faker.js
- **環境變數**: dotenv
- **套件管理**: pnpm
