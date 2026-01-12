import type { User } from './user'

/**
 * 認証関連の型定義
 */

/**
 * 認証レスポンス（ログイン/サインアップ）
 */
export interface AuthResponse {
  token: string
  user: User
}

/**
 * ログインリクエスト
 */
export interface LoginRequest {
  userName: string
  password: string
}

/**
 * サインアップリクエスト
 */
export interface SignupRequest {
  userName: string
  displayName: string
  password: string
}
