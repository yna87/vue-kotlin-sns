package io.github.yna87.vuekotlinsns.security

import io.github.yna87.vuekotlinsns.dto.ErrorResponse
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import tools.jackson.databind.ObjectMapper

/**
 * JWT認証失敗時のエントリーポイント
 *
 * 認証が必要なエンドポイントに未認証でアクセスした際に、
 * アプリケーション統一のエラーフォーマットでレスポンスを返す
 */
@Component
class JwtAuthenticationEntryPoint(
    private val objectMapper: ObjectMapper,
) : AuthenticationEntryPoint {
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException,
    ) {
        // 統一されたエラーレスポンスを作成
        val errorResponse =
            ErrorResponse(
                type = "unauthorized",
                message = "認証が必要です。ログインしてください。",
            )

        // JSONレスポンスを返却
        response.status = HttpStatus.UNAUTHORIZED.value()
        response.contentType = MediaType.APPLICATION_JSON_VALUE
        response.characterEncoding = "UTF-8"
        response.writer.write(objectMapper.writeValueAsString(errorResponse))
    }
}
