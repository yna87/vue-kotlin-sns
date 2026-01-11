/**
 * 投稿型
 */
export interface Post {
  /** 投稿ID */
  id: string
  /** 投稿本文 */
  content: string
  /** 投稿日時 */
  createdAt: string
}

/**
 * 投稿作成リクエスト型
 */
export interface PostCreateRequest {
  content: string
}
