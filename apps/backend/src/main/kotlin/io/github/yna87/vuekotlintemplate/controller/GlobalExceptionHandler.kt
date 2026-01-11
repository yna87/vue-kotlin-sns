package io.github.yna87.vuekotlintemplate.controller

import io.github.yna87.vuekotlintemplate.dto.ErrorResponse
import io.github.yna87.vuekotlintemplate.dto.FieldError
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

/**
 * グローバル例外ハンドラー
 * アプリケーション全体の例外を一元的に処理
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
                message = "Invalid request body. Please check required fields and data types.",
            )
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse)
    }

    /**
     * バリデーションエラーのハンドリング
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
                type = "invalidParameter",
                message = "One or more fields have invalid values",
                details = fieldErrors,
            )
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse)
    }

    /**
     * NoSuchElementException のハンドリング
     * 404 Not Found を返す
     */
    @ExceptionHandler(NoSuchElementException::class)
    fun handleNotFoundException(ex: NoSuchElementException): ResponseEntity<ErrorResponse> {
        val errorResponse =
            ErrorResponse(
                type = "notFound",
                message = ex.message ?: "Resource not found",
            )
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse)
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
                message = "An unexpected error occurred. Please try again later.",
            )
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse)
    }
}
