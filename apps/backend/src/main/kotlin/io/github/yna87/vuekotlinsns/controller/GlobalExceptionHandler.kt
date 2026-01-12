package io.github.yna87.vuekotlinsns.controller

import io.github.yna87.vuekotlinsns.dto.ErrorResponse
import io.github.yna87.vuekotlinsns.dto.FieldError
import io.github.yna87.vuekotlinsns.exception.ApplicationException
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

/**
 * グローバル例外ハンドラー
 * アプリケーション全体の例外を一元的に処理し、Open API仕様に準拠したエラーレスポンスを返す
 */
@RestControllerAdvice
class GlobalExceptionHandler {
    private val logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)

    /**
     * JSONパースエラーのハンドリング
     * 400 Bad Request を返す
     */
    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleHttpMessageNotReadableException(): ResponseEntity<ErrorResponse> {
        val errorResponse =
            ErrorResponse(
                type = "parseError",
                message = "リクエストボディが不正です。必須フィールドとデータ型を確認してください。",
            )
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse)
    }

    /**
     * バリデーションエラーのハンドリング（Bean Validation）
     * 400 Bad Request を返す
     */
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationException(ex: MethodArgumentNotValidException): ResponseEntity<ErrorResponse> {
        val fieldErrors =
            ex.bindingResult.fieldErrors.map {
                FieldError(
                    field = it.field,
                    message = it.defaultMessage ?: "Invalid value",
                )
            }

        val errorResponse =
            ErrorResponse(
                type = "validationError",
                message = "1つ以上のフィールドに不正な値が含まれています",
                details = fieldErrors,
            )
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse)
    }

    /**
     * アプリケーション例外のハンドリング
     * カスタム例外階層（ApplicationException）を統一的に処理
     * エラータイプとHTTPステータスは例外クラスで定義されている
     */
    @ExceptionHandler(ApplicationException::class)
    fun handleApplicationException(ex: ApplicationException): ResponseEntity<ErrorResponse> {
        // 認証エラー以外はログに出力（デバッグ用）
        if (ex.status != HttpStatus.UNAUTHORIZED) {
            logger.warn("Application exception occurred: ${ex.errorType} - ${ex.message}")
        }

        val errorResponse =
            ErrorResponse(
                type = ex.errorType,
                message = ex.message ?: "エラーが発生しました",
                details = ex.details,
            )
        return ResponseEntity.status(ex.status).body(errorResponse)
    }

    /**
     * その他の例外のハンドリング
     * 500 Internal Server Error を返す
     */
    @ExceptionHandler(Exception::class)
    fun handleGlobalException(ex: Exception): ResponseEntity<ErrorResponse> {
        // 詳細なエラー情報はサーバーログに出力
        logger.error("Unexpected error occurred", ex)

        // クライアントには汎用的なメッセージのみ返す
        val errorResponse =
            ErrorResponse(
                type = "internalError",
                message = "予期しないエラーが発生しました。しばらくしてから再度お試しください。",
            )
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse)
    }
}
