# Vue Kotlin SNS

Vue 3 + Kotlin/Spring Boot によるシンプルな SNS アプリケーションです。

## 機能

- ユーザー認証（JWT）
  - サインアップ
  - ログイン
  - ログアウト
- 投稿機能
  - 投稿作成（最大 280 文字）
  - タイムライン表示（新しい順）

## 技術スタック

### フロントエンド (`apps/frontend`)

**コアフレームワーク**

- Vue 3 + TypeScript + Vite
- Vue Router
- TanStack Query (Vue Query)

**UI/スタイリング**

- Nuxt UI + Tailwind CSS v4

**開発ツール**

- Vitest + Storybook (テスト・コンポーネント開発)
- ESLint + Prettier (コード品質・フォーマット)
- pnpm (パッケージマネージャー)

### バックエンド (`apps/backend`)

**コアフレームワーク**

- Spring Boot 4.0.1 + Kotlin 2.2.20 + Java 21

**データベース**

- PostgreSQL + Exposed (ORM) + Flyway (マイグレーション)

**認証・セキュリティ**

- JWT + BCrypt

**開発ツール**

- Gradle (ビルドツール)
- ktlint + detekt (コード品質・静的解析)

## 前提条件

- Node.js（推奨バージョンは `.node-version` に記載）
- pnpm 10.24.0 以上
- Java 21
- PostgreSQL

## セットアップ

### 1. データベースの作成

バックエンドを起動する前に、PostgreSQL でデータベースを作成してください：

```bash
# 方法1: psqlコマンドから
psql postgres
CREATE DATABASE vue_kotlin_sns;
\l  # データベース一覧を確認
\q  # 終了

# 方法2: createdbコマンド
createdb vue_kotlin_sns
```

**注意**: データベース名とユーザー名は `apps/backend/src/main/resources/application.yaml` の設定と一致させてください。

### 2. フロントエンド

```bash
cd apps/frontend

# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

### 3. バックエンド

#### 3.1 環境変数の設定

開発環境用の設定ファイルを作成します：

```bash
cd apps/backend/src/main/resources

# テンプレートをコピー
cp application-local.yml.example application-local.yml

# JWT秘密鍵を生成
openssl rand -base64 32

# 生成された秘密鍵を application-local.yml に設定
# jwt:
#   secret: <生成された秘密鍵>
```

#### 3.2 アプリケーションの起動

```bash
cd apps/backend

# ビルド
./gradlew build

# アプリケーションの起動（localプロファイルを使用）
./gradlew bootRun --args='--spring.profiles.active=local'
```

初回起動時、Flyway がデータベースマイグレーションを自動的に実行します。

## 利用可能なコマンド

### クイックスタート（Makefile）

プロジェクトルートで以下のコマンドを実行できます：

```bash
# 利用可能なコマンドを表示
make help

# フロントエンドとバックエンドを同時に起動
make dev

# フロントエンドのみ起動
make dev-frontend

# バックエンドのみ起動
make dev-backend
```

**注意:** `make dev-backend` を使用する場合は、事前に `application-local.yml` の設定が必要です。

### フロントエンド

```bash
cd apps/frontend

# 開発サーバーの起動
pnpm dev

# Storybook の起動
pnpm storybook

# テストの実行
pnpm test              # すべてのテストを実行
pnpm test:unit         # ユニットテストのみ実行
pnpm test:storybook    # Storybook テストのみ実行
pnpm test:watch        # watch モードでテスト実行

# コードの lint チェック
pnpm lint

# コードのフォーマット
pnpm format

# 型チェック
pnpm type-check
```

### バックエンド

```bash
cd apps/backend

# アプリケーションの起動（localプロファイル使用）
./gradlew bootRun --args='--spring.profiles.active=local'

# ビルド
./gradlew build

# テストの実行
./gradlew test

# コード品質チェック
./gradlew ktlintCheck  # Kotlin コードスタイルチェック
./gradlew detekt       # 静的解析

# コードフォーマット
./gradlew ktlintFormat # Kotlin コードの自動フォーマット
```

## プロジェクト構成

```
vue-kotlin-sns/
├── apps/
│   ├── frontend/                      # Vue フロントエンドアプリケーション
│   │   ├── src/
│   │   │   ├── components/            # Vue コンポーネント
│   │   │   ├── composables/           # Vue Composition API
│   │   │   ├── api/                   # API クライアント
│   │   │   ├── types/                 # TypeScript 型定義
│   │   │   ├── assets/                # 静的アセット
│   │   │   ├── App.vue
│   │   │   ├── main.ts
│   │   │   └── style.css
│   │   ├── public/                    # 公開ファイル
│   │   ├── .storybook/                # Storybook 設定
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── backend/                       # Kotlin/Spring Boot バックエンド
│       ├── src/
│       │   ├── main/
│       │   │   ├── kotlin/            # アプリケーションコード
│       │   │   └── resources/
│       │   │       ├── application.yaml
│       │   │       └── db/migration/  # Flyway マイグレーション
│       │   └── test/kotlin/           # テストコード
│       ├── build.gradle.kts           # ビルド設定
│       └── settings.gradle.kts
│
├── docs/                              # 設計ドキュメント
│   ├── er-diagram.md                  # ER図
│   ├── open-api.yaml                  # API仕様
│   ├── screens/                       # 画面設計
│   └── sequences/                     # シーケンス図
├── .github/                           # GitHub Actions workflows
└── .vscode/                           # VSCode 設定
```

## ドキュメント

詳細な設計ドキュメントは `docs/` ディレクトリにあります：

- [ER 図](docs/er-diagram.md) - データベース設計
- [API 仕様](docs/open-api.yaml) - OpenAPI 3.0 形式の API 仕様
- [画面設計](docs/screens/README.md) - 画面構成と遷移
- [認証シーケンス](docs/sequences/authentication.md) - JWT 認証のシーケンス図

## ライセンス

[MIT License](LICENSE)
