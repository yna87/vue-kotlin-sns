package io.github.yna87.vuekotlinsns.exception

import io.github.yna87.vuekotlinsns.dto.FieldError
import org.springframework.http.HttpStatus

/**
 * アプリケーション例外の基底クラス
 * Open API仕様で定義されたエラータイプとHTTPステータスコードを保持
 */
sealed class ApplicationException(
    message: String,
    val errorType: String,
    val status: HttpStatus,
    val details: List<FieldError>? = null,
) : RuntimeException(message)

/**
 * 重複エラー (409 Conflict)
 * ユーザー名やリソースが既に存在する場合にスロー
 */
class DuplicateResourceException(
    message: String,
) : ApplicationException(
        message = message,
        errorType = "duplicate",
        status = HttpStatus.CONFLICT,
    )

/**
 * 認証エラー (401 Unauthorized)
 * ユーザー名またはパスワードが正しくない場合にスロー
 */
class UnauthorizedException(
    message: String,
) : ApplicationException(
        message = message,
        errorType = "unauthorized",
        status = HttpStatus.UNAUTHORIZED,
    )

/**
 * トークン無効エラー (401 Unauthorized)
 * JWTトークンが無効または期限切れの場合にスロー
 */
class InvalidTokenException(
    message: String,
) : ApplicationException(
        message = message,
        errorType = "invalidToken",
        status = HttpStatus.UNAUTHORIZED,
    )

/**
 * リソース未検出エラー (404 Not Found)
 * 指定されたリソースが見つからない場合にスロー
 */
class ResourceNotFoundException(
    message: String,
) : ApplicationException(
        message = message,
        errorType = "notFound",
        status = HttpStatus.NOT_FOUND,
    )

/**
 * 不正なパラメータエラー (400 Bad Request)
 * ビジネスロジック上のバリデーションエラー
 * ※Bean Validationとは異なる、ドメイン固有のバリデーションに使用
 */
class InvalidParameterException(
    message: String,
) : ApplicationException(
        message = message,
        errorType = "invalidParameter",
        status = HttpStatus.BAD_REQUEST,
    )
