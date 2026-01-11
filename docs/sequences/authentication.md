# 認証シーケンス

## 概要

JWT（JSON Web Token）を使用した認証システムの主要なシーケンス図です。フロントエンド、バックエンド、データベース間の相互作用を示します。

## サインアップ

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant Frontend as フロントエンド
    participant Backend as バックエンド
    participant DB as データベース

    User->>+Frontend: フォーム送信<br/>(userName, displayName, password)
    Frontend->>+Backend: POST /auth/signup
    Backend->>+DB: ユーザー名の重複チェック
    DB-->>-Backend: 結果
    alt ユーザー名が既に存在
        Backend-->>Frontend: 409 Conflict<br/>{type: "duplicate"}
        Frontend-->>User: エラー表示
    else ユーザー名が利用可能
        Backend->>+DB: ユーザー作成
        DB-->>-Backend: ユーザー情報
        Backend-->>-Frontend: 201 Created<br/>{token, user}
        Frontend-->>-User: タイムラインへ遷移
    end
```

## ログイン

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant Frontend as フロントエンド
    participant Backend as バックエンド
    participant DB as データベース

    User->>+Frontend: フォーム送信<br/>(userName, password)
    Frontend->>+Backend: POST /auth/login
    Backend->>+DB: ユーザー検索
    DB-->>-Backend: 結果
    alt 認証失敗
        Backend-->>Frontend: 401 Unauthorized<br/>{type: "unauthorized"}
        Frontend-->>User: エラー表示
    else 認証成功
        Backend-->>-Frontend: 200 OK<br/>{token, user}
        Frontend-->>-User: タイムラインへ遷移
    end
```

## ログアウト

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant Frontend as フロントエンド

    User->>+Frontend: ログアウトボタンクリック
    Frontend->>Frontend: トークン削除
    Frontend->>Frontend: 認証状態クリア
    Frontend-->>-User: タイムラインへ遷移
```

## 認証が必要な API（投稿作成の例）

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant Frontend as フロントエンド
    participant Backend as バックエンド
    participant DB as データベース

    User->>+Frontend: フォーム送信<br/>(content)
    Frontend->>+Backend: POST /posts<br/>Authorization: Bearer {token}
    Backend->>Backend: JWTトークン検証
    alt トークン無効
        Backend-->>Frontend: 401 Unauthorized<br/>{type: "invalidToken"}
        Frontend-->>User: ログイン画面へ遷移
    else トークン有効
        Backend->>+DB: 投稿作成
        DB-->>-Backend: 投稿データ
        Backend-->>-Frontend: 201 Created<br/>{post with user}
        Frontend-->>-User: タイムラインへ遷移
    end
```

## 備考

### トークンの扱い

- フロントエンドはトークンを保持し、認証が必要な API リクエスト時に送信する
- トークンの保存方法や管理は実装の詳細
- ログアウト時はフロントエンド側でトークンを削除する（JWT 方式のためサーバー側の処理は不要）

### JWT トークンのペイロード

- `sub` (subject): ユーザー ID（UUID）
- `iat` (issued at): 発行日時
- `exp` (expiration): 有効期限

### パスワードハッシュ化

- バックエンドは BCrypt を使用してパスワードをハッシュ化する

## 関連ドキュメント

- [ER 図](../er-diagram.md) - データベース設計
- [OpenAPI 仕様](../open-api.yaml) - API 仕様
- [画面設計](../screens/README.md) - 画面遷移

## 変更履歴

| 日付       | 変更内容                     |
| ---------- | ---------------------------- |
| 2026-01-12 | ログアウトシーケンス図を追加 |
| 2026-01-12 | 初版作成                     |
