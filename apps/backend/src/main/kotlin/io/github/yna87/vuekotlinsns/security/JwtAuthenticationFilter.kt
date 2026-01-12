package io.github.yna87.vuekotlinsns.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

/**
 * JWT認証フィルター
 *
 * リクエストヘッダーからJWTトークンを抽出し、検証してSecurityContextに認証情報を設定する
 */
@Component
class JwtAuthenticationFilter(
    private val jwtUtil: JwtUtil,
) : OncePerRequestFilter() {
    companion object {
        private const val AUTHORIZATION_HEADER = "Authorization"
        private const val BEARER_PREFIX = "Bearer "
    }

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        try {
            // AuthorizationヘッダーからJWTトークンを抽出
            val jwt = extractJwtFromRequest(request)

            if (jwt != null && jwtUtil.validateToken(jwt)) {
                // トークンからユーザーIDを取得
                val userId = jwtUtil.getUserIdFromToken(jwt)

                if (userId != null) {
                    // UserPrincipalを作成
                    val userPrincipal = UserPrincipal(userId)

                    // 認証情報をSecurityContextに設定
                    val authentication =
                        UsernamePasswordAuthenticationToken(
                            userPrincipal,
                            null,
                            emptyList(),
                        )
                    authentication.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication = authentication
                }
            }
        } catch (ex: IllegalArgumentException) {
            logger.error("Invalid authentication token format", ex)
        } catch (ex: IllegalStateException) {
            logger.error("Authentication state error", ex)
        }

        filterChain.doFilter(request, response)
    }

    /**
     * リクエストからJWTトークンを抽出
     *
     * @param request HTTPリクエスト
     * @return JWTトークン、存在しない場合はnull
     */
    private fun extractJwtFromRequest(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader(AUTHORIZATION_HEADER)
        return if (bearerToken != null && bearerToken.startsWith(BEARER_PREFIX)) {
            bearerToken.substring(BEARER_PREFIX.length)
        } else {
            null
        }
    }
}
