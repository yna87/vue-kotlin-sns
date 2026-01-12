import { z } from 'zod'

/**
 * ログインのバリデーションスキーマ
 */
export const loginSchema = z.object({
  userName: z.string().min(1, 'ユーザー名を入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
})

export type LoginFormData = z.infer<typeof loginSchema>

/**
 * サインアップのバリデーションスキーマ
 */
export const signupSchema = z.object({
  userName: z
    .string()
    .min(1, 'ユーザー名を入力してください')
    .min(3, 'ユーザー名は3〜50文字で入力してください')
    .max(50, 'ユーザー名は3〜50文字で入力してください')
    .regex(/^[a-zA-Z0-9_]+$/, 'ユーザー名は英数字とアンダースコアのみ使用できます'),
  displayName: z
    .string()
    .min(1, '表示名を入力してください')
    .max(100, '表示名は1〜100文字で入力してください'),
  password: z
    .string()
    .min(1, 'パスワードを入力してください')
    .min(8, 'パスワードは8文字以上で入力してください'),
})

export type SignupFormData = z.infer<typeof signupSchema>
