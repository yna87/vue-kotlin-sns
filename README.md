# Vue Kotlin Template

Vue 3 + Kotlin/Spring Boot によるフルスタックアプリケーションのテンプレートリポジトリです。

## 特徴

このテンプレートには以下のツールと設定が含まれています：

### フロントエンド (`apps/frontend`)

- **Vue 3** - プログレッシブフレームワーク
- **TypeScript** - 型安全な開発環境
- **Vite** - 高速なビルドツール
- **Tailwind CSS v4** - ユーティリティファーストの CSS フレームワーク
- **Vitest** - 高速なユニットテストフレームワーク
  - Vue Test Utils - Vue コンポーネントのテストユーティリティ
  - Playwright - ブラウザテスト環境
- **Storybook** - UI コンポーネント開発・テスト環境
  - Storybook Test (addon-vitest) - ストーリーベースのテスト
- **ESLint** - コード品質チェック
- **Prettier** - コードフォーマッター
- **pnpm** - 高速で効率的なパッケージマネージャー

### バックエンド (`apps/backend`)

- **Spring Boot 4.0.1** - エンタープライズ対応フレームワーク
- **Kotlin 2.2.20** - モダンな JVM 言語
- **Java 21** - 最新の LTS バージョン
- **PostgreSQL** - リレーショナルデータベース
- **Flyway** - データベースマイグレーション
- **Exposed** - Kotlin ネイティブな ORM フレームワーク（型安全な SQL DSL）
- **Jakarta Bean Validation** - アノテーションベースのバリデーション
- **Gradle** - ビルドツール
- **ktlint** - Kotlin コードフォーマッター
- **detekt** - Kotlin 静的解析ツール

## このテンプレートの使い方

### GitHub でテンプレートリポジトリとして使用する

1. このリポジトリのページで「Use this template」ボタンをクリック
2. 新しいリポジトリ名を入力して作成
3. 作成したリポジトリをクローン

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 前提条件

- Node.js（推奨バージョンは `.node-version` に記載）
- pnpm 10.24.0 以上
- Java 21
- PostgreSQL

### ローカルでセットアップ

#### 1. データベースの作成

バックエンドを起動する前に、PostgreSQL でデータベースを作成してください：

```bash
# 方法1: psqlコマンドから
psql postgres
CREATE DATABASE vue_kotlin_template;
\l  # データベース一覧を確認
\q  # 終了

# 方法2: createdbコマンド
createdb vue_kotlin_template
```

または、既存のユーザーを使用する場合は、データベースのみ作成：

```bash
psql -U postgres -c "CREATE DATABASE vuekotlintemplate;"
```

**注意**: データベース名とユーザー名は `apps/backend/src/main/resources/application.yaml` の設定と一致させてください。

#### 2. フロントエンド

```bash
cd apps/frontend

# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

#### 3. バックエンド

```bash
cd apps/backend

# ビルド
./gradlew build

# アプリケーションの起動
./gradlew bootRun
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

# アプリケーションの起動
./gradlew bootRun

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
vue-kotlin-template/
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
├── .github/                           # GitHub Actions workflows
└── .vscode/                           # VSCode 設定
```

## 初期設定とカスタマイズ

このテンプレートを使用する際は、以下の項目をプロジェクトに合わせてカスタマイズしてください：

### 必須のカスタマイズ

テンプレートを使用する際は、以下の項目を必ず変更してください：

#### バックエンドの package 名の変更

現在の package 名 `io.github.yna87.vuekotlintemplate` を自分のプロジェクトに合わせて変更します。

1. ディレクトリ構造を変更:

   ```bash
   # 例: io.yourname.yourproject に変更する場合
   cd apps/backend/src/main/kotlin
   mkdir -p io/yourname/yourproject
   mv io/github/yna87/vuekotlintemplate/* io/yourname/yourproject/
   rm -rf io/github

   # テストコードも同様に
   cd ../../../test/kotlin
   mkdir -p io/yourname/yourproject
   mv io/github/yna87/vuekotlintemplate/* io/yourname/yourproject/
   rm -rf io/github
   ```

2. すべての `.kt` ファイルの `package` 宣言を変更:
   - `apps/backend/src/main/kotlin/**/*.kt`
   - `apps/backend/src/test/kotlin/**/*.kt`
   - 各ファイルの先頭の `package io.github.yna87.vuekotlintemplate` を新しい package 名に変更

#### プロジェクト名の変更

1. **バックエンド**

   - `apps/backend/build.gradle.kts`:
     - `group = "com.example"` → 自分の group ID に変更
     - `description = "Vue Kotlin Template"` → プロジェクトの説明に変更

2. **フロントエンド**
   - `apps/frontend/package.json`:
     - `"name": "vue-kotlin-template"` → プロジェクト名に変更

#### データベース設定の変更

`apps/backend/src/main/resources/application.yaml` を環境に合わせて変更:

```yaml
datasource:
  url: jdbc:postgresql://localhost:5432/vuekotlintemplate # データベース名を変更
  username: yna87 # データベースユーザー名を変更
  password: # パスワードを設定
```

## ライセンス

[MIT License](LICENSE)
