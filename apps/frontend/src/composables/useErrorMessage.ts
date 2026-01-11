/**
 * エラーメッセージを取得するための composable
 * @param error エラーオブジェクト
 * @param defaultMessage デフォルトのエラーメッセージ
 * @param options オプション
 * @returns エラーメッセージの computed ref
 */
export function useErrorMessage(
  error: Ref<unknown>,
  defaultMessage: string,
  options: { useToast?: boolean } = {},
) {
  const errorMessage = computed(() => {
    if (!error.value) return null
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
