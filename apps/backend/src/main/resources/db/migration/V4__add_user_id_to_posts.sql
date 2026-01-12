-- Add user_id column to posts table
ALTER TABLE posts ADD COLUMN user_id UUID NOT NULL;

-- Add foreign key constraint
ALTER TABLE posts ADD CONSTRAINT fk_posts_user_id
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Create index for user_id
CREATE INDEX idx_posts_user_id ON posts (user_id);

-- Add comment
COMMENT ON COLUMN posts.user_id IS '投稿者のユーザーID';
