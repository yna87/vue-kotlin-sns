import { isAxiosError } from 'axios'
import type { ApiError } from '@/types/error'

export interface UseErrorMessageOptions {
  /**
   * Toastでエラーを表示するかどうか
   */
  useToast?: boolean
}

/**
 * エラーメッセージを取得するための composable
 * バックエンドのApiError形式のエラーレスポンスを優先的に使用する
 * @param error エラーオブジェクト
 * @param defaultMessage デフォルトのエラーメッセージ
 * @param options オプション
 * @returns エラーメッセージの computed ref
 */
export function useErrorMessage(
  error: Ref<Error | null>,
  defaultMessage: string,
  options: UseErrorMessageOptions = {},
) {
  const errorMessage = computed(() => {
    if (!error.value) return null

    // Axiosエラーのレスポンスデータ（ApiError形式）を優先
    if (isAxiosError<ApiError>(error.value)) {
      const apiErrorMessage = error.value.response?.data?.message
      if (apiErrorMessage) {
        return apiErrorMessage
      }
    }

    // Errorインスタンスのメッセージ
    if (error.value instanceof Error) {
      return error.value.message || defaultMessage
    }

    return defaultMessage
  })

  if (options.useToast) {
    const toast = useToast()

    watch(error, (err) => {
      if (err) {
        toast.add({
          title: 'エラー',
          description: errorMessage.value!,
          color: 'error',
        })
      }
    })
  }

  return errorMessage
}
