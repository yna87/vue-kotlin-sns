import { z } from 'zod'

/**
 * 投稿作成のバリデーションスキーマ
 */
export const postCreateSchema = z.object({
  content: z
    .string()
    .min(1, '投稿内容を入力してください')
    .max(280, '投稿は280文字以内で入力してください'),
})

export type PostCreateFormData = z.infer<typeof postCreateSchema>
