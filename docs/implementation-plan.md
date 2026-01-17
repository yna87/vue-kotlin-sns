# 実装計画 (v0.2.0)

## 概要

v0.1.0 から v0.2.0 への実装計画。JWT 認証機能の追加とユーザー管理機能の実装。

## v0.1.0 からの完了済み実装

### バックエンド

#### 認証機能

- ✅ `POST /auth/signup` - ユーザー登録
- ✅ `POST /auth/login` - ログイン
- ✅ JwtUtil 実装 (JWT 生成・検証)
- ✅ BCrypt によるパスワードハッシュ化
- ✅ AuthService 実装
- ✅ AuthController 実装

#### データベース

- ✅ users テーブル追加 (V3 マイグレーション)
- ✅ posts テーブルに user_id 追加 (V4 マイグレーション)
- ✅ UserRepository 実装

#### エラーハンドリング

- ✅ GlobalExceptionHandler 実装
- ✅ カスタム例外 (DuplicateResourceException, UnauthorizedException)

### ドキュメント

- ✅ 認証シーケンス図 (サインアップ、ログイン、ログアウト)
- ✅ 画面設計書 (ログイン、サインアップ、ヘッダー、タイムライン、投稿作成)
- ✅ ER 図更新
- ✅ OpenAPI 仕様更新

---

## v0.2.0 実装進捗

### 1. バックエンド API ✅ **完了**

#### 1.1 現在のユーザー情報取得 API ✅

- **エンドポイント**: `GET /auth/me`
- **説明**: JWT 検証して現在ログイン中のユーザー情報を取得
- **実装内容**:
  - ✅ AuthController に@GetMapping("/me")を追加
  - ✅ @AuthenticationPrincipal で UserPrincipal を取得
  - ✅ AuthService.getCurrentUser()実装
  - ✅ UserRepository でユーザー情報を取得
  - ✅ UserResponse を返却
- **関連ファイル**:
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/controller/AuthController.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/service/AuthService.kt`

#### 1.2 認証フィルター設定 ✅

- **説明**: JWT 認証が必要なエンドポイントの保護
- **実装内容**:
  - ✅ SecurityConfig の更新（SecurityFilterChain 設定）
  - ✅ JwtAuthenticationFilter 実装（JWT 検証フィルター）
  - ✅ JwtAuthenticationEntryPoint 実装（エラーフォーマット統一）
  - ✅ UserPrincipal 実装（認証プリンシパル）
  - ✅ security/パッケージへの統一（ベストプラクティス準拠）
  - ✅ /auth/me, POST /posts を認証必須に設定
- **関連ファイル**:
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/config/SecurityConfig.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/security/JwtAuthenticationFilter.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/security/JwtAuthenticationEntryPoint.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/security/UserPrincipal.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/security/JwtUtil.kt`

#### 1.3 投稿 API にユーザー情報を含める ✅

- **エンドポイント**: `GET /posts`, `POST /posts`
- **説明**: 投稿一覧・投稿作成時にユーザー情報を含めて返す
- **実装内容**:
  - ✅ Post エンティティに user フィールド（User 型、non-nullable）を追加
  - ✅ PostResponse に user フィールド（UserResponse 型）を追加
  - ✅ PostRepository で users テーブルを JOIN してユーザー情報を取得
  - ✅ 投稿作成時に@AuthenticationPrincipal からユーザー ID を取得
  - ✅ PostService を更新してユーザー情報を含める
- **関連ファイル**:
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/entity/Post.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/dto/PostResponse.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/repository/PostRepository.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/repository/PostRepositoryImpl.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/service/PostService.kt`
  - `apps/backend/src/main/kotlin/io/github/yna87/vuekotlinsns/controller/PostController.kt`

### 2. フロントエンド基盤 ✅ **完了**

#### 2.1 型定義 ✅

- **説明**: 認証とユーザーの型定義
- **実装内容**:
  - ✅ types/user.ts - User型定義（ドメイン分離）
  - ✅ types/auth.ts - AuthResponse, LoginRequest, SignupRequest型定義
  - ✅ schemas/auth.ts - Zodによるバリデーションスキーマ（ログイン、サインアップ）
- **関連ファイル**:
  - `apps/frontend/src/types/user.ts`
  - `apps/frontend/src/types/auth.ts`
  - `apps/frontend/src/schemas/auth.ts`

#### 2.2 認証ストア ✅

- **説明**: JWT トークンとログイン状態の管理
- **実装内容**:
  - ✅ Pinia認証ストアの作成
  - ✅ useLocalStorageによるトークン永続化
  - ✅ login, logout, setUser アクション実装
  - ✅ isAuthenticated ゲッター実装
- **関連ファイル**:
  - `apps/frontend/src/stores/auth.ts`

#### 2.3 API クライアント設定 ✅

- **説明**: 認証が必要な API リクエストへのトークン付与
- **実装内容**:
  - ✅ リクエストインターセプターで Authorization ヘッダーを自動付与
  - ✅ レスポンスインターセプターで 401 エラー時のログイン画面リダイレクト
  - ✅ authApi実装（login, signup, getCurrentUser）
  - ✅ useApi composableにauthApiを追加
- **関連ファイル**:
  - `apps/frontend/src/api/client.ts`
  - `apps/frontend/src/api/auth.ts`
  - `apps/frontend/src/composables/useApi.ts`

### 3. 認証画面 ✅ **完了**

#### 3.1 ログイン画面 ✅

- **画面 ID**: SC-AUTH-001
- **パス**: `/login`
- **実装内容**:
  - ✅ Nuxt UI (UForm, UInput, UButton) を使用したフォーム
  - ✅ Zodスキーマによるバリデーション（必須チェック）
  - ✅ authApi.loginによるAPI呼び出し
  - ✅ 成功時にトークン保存してタイムラインへ遷移
  - ✅ エラーハンドリング（401エラー、一般エラー）
  - ✅ 新規登録リンク
  - ✅ 既にログイン済みの場合のリダイレクト
  - ✅ Storybookストーリー作成
- **関連ファイル**:
  - `apps/frontend/src/pages/LoginPage.vue`
  - `apps/frontend/src/pages/LoginPage.stories.ts`
  - `apps/frontend/src/router/index.ts`

#### 3.2 サインアップ画面 ✅

- **画面 ID**: SC-AUTH-002
- **パス**: `/signup`
- **実装内容**:
  - ✅ Nuxt UI (UForm, UInput, UButton) を使用したフォーム
  - ✅ Zodスキーマによるバリデーション
    - ユーザー名: 3-50文字、英数字+アンダースコア
    - 表示名: 1-100文字
    - パスワード: 8文字以上
  - ✅ authApi.signupによるAPI呼び出し
  - ✅ 成功時にトークン保存してタイムラインへ遷移
  - ✅ エラーハンドリング（409 Conflict、一般エラー）
  - ✅ ログインリンク
  - ✅ 既にログイン済みの場合のリダイレクト
- **関連ファイル**:
  - `apps/frontend/src/pages/SignupPage.vue`
  - `apps/frontend/src/router/index.ts`

---

## v0.2.0 実装完了 🎉

すべてのフェーズが完了しました。

---

## 実装詳細

### 4. 共通コンポーネント

#### 4.1 共通ヘッダーコンポーネント ✅

- **説明**: 全画面共通のヘッダー
- **実装内容**:
  - ✅ タイトル表示（Vue Kotlin SNS）
  - ✅ ログイン状態に応じた表示切替
  - ✅ 未ログイン時: [ログイン][登録]ボタン
  - ✅ ログイン済み時: 表示名 + [ログアウト]ボタン
  - ✅ ログアウトボタンクリック時にトークン削除
  - ✅ 画面遷移処理（ログイン/登録/ログアウト）
  - ✅ Storybookストーリー作成（ログイン状態、ログアウト状態、各ボタンクリックテスト）
- **新規ファイル**:
  - `apps/frontend/src/components/AppHeader.vue`
  - `apps/frontend/src/components/AppHeader.stories.ts`

#### 4.2 ルーティング設定 ✅

- **説明**: 認証画面のルート追加と認証ガード
- **実装内容**:
  - ✅ ナビゲーションガード実装（router.beforeEach）
  - ✅ 認証が必要な画面へのアクセス制御（requiresAuth メタフィールド）
  - ✅ ログイン済みユーザーが認証画面にアクセス時のリダイレクト（guestOnly メタフィールド）
  - ✅ /posts/new を認証必須に設定
  - ✅ /login, /signup をゲスト専用に設定
- **更新ファイル**:
  - `apps/frontend/src/router/index.ts`

### 5. 既存画面の認証対応

#### 5.1 タイムライン画面の更新 ✅

- **画面 ID**: SC-POST-001
- **パス**: `/`
- **実装内容**:
  - ✅ ヘッダーコンポーネントの追加
  - ✅ ログイン状態に応じて[投稿する]ボタンの表示/非表示
  - ✅ 投稿カードにユーザー情報表示 (displayName, @userName)
  - ✅ Post型にuserフィールド追加
- **更新ファイル**:
  - `apps/frontend/src/pages/TimelinePage.vue`
  - `apps/frontend/src/components/PostCard.vue`
  - `apps/frontend/src/types/post.ts`

#### 5.2 投稿作成画面の更新 ✅

- **画面 ID**: SC-POST-002
- **パス**: `/posts/new`
- **実装内容**:
  - ✅ ヘッダーコンポーネントの追加
  - ✅ 未ログイン時のログイン画面リダイレクト（ルーティングガードで実装済み）
  - ✅ 認証ヘッダー付きの POST /posts API 呼び出し（APIクライアントで実装済み）
  - ✅ 401 エラー時のログイン画面リダイレクト（APIクライアントで実装済み）
- **更新ファイル**:
  - `apps/frontend/src/pages/PostCreatePage.vue`

#### 5.3 App.vue の更新 ✅

- **実装内容**:
  - ✅ App.vueでAppHeaderを一元管理
  - ✅ 認証画面では右上ボタンを非表示（ルート名で判定）
  - ✅ 各ページからAppHeaderのインポートと記述を削除
- **更新ファイル**:
  - `apps/frontend/src/App.vue`
  - `apps/frontend/src/components/AppHeader.vue`
  - `apps/frontend/src/pages/TimelinePage.vue`
  - `apps/frontend/src/pages/PostCreatePage.vue`

---

## 実装の優先順位

### フェーズ 1: バックエンド API 完成 ✅ **完了 (2026-01-12)**

1. ✅ 投稿 API にユーザー情報を含める (GET /posts, POST /posts)
2. ✅ GET /auth/me エンドポイント実装
3. ✅ JWT 認証フィルター実装

### フェーズ 2: フロントエンド基盤 ✅ **完了 (2026-01-12)**

4. ✅ 認証ストア実装
5. ✅ API クライアント設定

### フェーズ 3: 認証画面 ✅ **完了 (2026-01-12)**

6. ✅ ログイン画面実装
7. ✅ サインアップ画面実装

### フェーズ 4: 共通コンポーネント ✅ **完了 (2026-01-17)**

8. ✅ ヘッダーコンポーネント実装
9. ✅ ルーティング設定更新（認証ガード）

### フェーズ 5: 既存画面の認証対応 ✅ **完了 (2026-01-17)**

10. ✅ タイムライン画面更新
11. ✅ 投稿作成画面更新
12. ✅ App.vue 更新

---

## 技術スタック

### バックエンド

- Kotlin + Spring Boot
- Spring Security + JWT
- Exposed (ORM)
- PostgreSQL
- BCrypt (パスワードハッシュ化)

### フロントエンド

- Vue 3 + TypeScript
- Pinia (状態管理)
- Vue Router
- Axios (HTTP 通信)

---

## 参考ドキュメント

- [認証シーケンス図](./sequences/authentication.md)
- [OpenAPI 仕様](./open-api.yaml)
- [ER 図](./er-diagram.md)
- [画面設計一覧](./screens/README.md)

---

## 変更履歴

| 日付       | 変更内容                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| 2026-01-17 | **v0.2.0 実装完了** 🎉 全フェーズ完了：認証機能の完全実装                                             |
| 2026-01-17 | App.vueでヘッダー一元管理に変更：認証画面では右上ボタンを非表示、画面設計書更新                       |
| 2026-01-17 | フェーズ 5（既存画面の認証対応）完了：タイムライン、投稿作成、App.vue 更新                            |
| 2026-01-17 | フェーズ 4（共通コンポーネント）完了：AppHeader 実装、認証ガード実装                                  |
| 2026-01-12 | フェーズ 3（認証画面）完了：ログイン画面、サインアップ画面、バリデーションスキーマ                   |
| 2026-01-12 | フェーズ 2（フロントエンド基盤）完了：認証ストア、API クライアント、型定義                            |
| 2026-01-12 | フェーズ 1（バックエンド API）完了：JWT 認証フィルター、投稿 API にユーザー情報、GET /auth/me        |
| 2026-01-12 | 初版作成 (v0.2.0)                                                                                     |
