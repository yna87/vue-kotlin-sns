-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create unique index for user_name
CREATE UNIQUE INDEX idx_users_user_name ON users (user_name);

-- Add comments to table
COMMENT ON TABLE users IS 'ユーザーテーブル';
COMMENT ON COLUMN users.id IS 'ユーザーID（UUID v4、アプリケーション層で生成）';
COMMENT ON COLUMN users.user_name IS 'ログインID（ユニーク、3〜50文字、英数字とアンダースコアのみ）';
COMMENT ON COLUMN users.display_name IS '表示名（1〜100文字）';
COMMENT ON COLUMN users.password_hash IS 'ハッシュ化されたパスワード（BCrypt）';
COMMENT ON COLUMN users.created_at IS 'アカウント作成日時';
