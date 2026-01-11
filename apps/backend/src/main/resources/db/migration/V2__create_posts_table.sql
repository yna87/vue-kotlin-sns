-- Create posts table
CREATE TABLE posts (
    id UUID PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for created_at in descending order to optimize timeline queries
CREATE INDEX idx_posts_created_at_desc ON posts (created_at DESC);

-- Add comment to table
COMMENT ON TABLE posts IS '投稿テーブル';
COMMENT ON COLUMN posts.id IS '投稿ID（UUID v4）';
COMMENT ON COLUMN posts.content IS '投稿本文（最大280文字、アプリケーション層で制限）';
COMMENT ON COLUMN posts.created_at IS '投稿日時（タイムゾーン付き）';
