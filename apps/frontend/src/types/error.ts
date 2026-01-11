/**
 * APIエラーレスポンス型
 * API仕様: ErrorResponse schema
 */
export interface ApiError {
  type: string
  message: string
  details?: ApiErrorDetail[]
}

/**
 * APIエラー詳細型
 * バリデーションエラーなどで使用
 */
export interface ApiErrorDetail {
  field: string
  message: string
}
