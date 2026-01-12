package io.github.yna87.vuekotlinsns.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.Date
import java.util.UUID
import javax.crypto.SecretKey

/**
 * JWTトークンの生成と検証を行うユーティリティクラス
 */
@Component
class JwtUtil(
    @Value("\${jwt.secret}") private val secret: String,
    @Value("\${jwt.expiration}") private val expiration: Long,
) {
    private val logger = LoggerFactory.getLogger(JwtUtil::class.java)

    private val secretKey: SecretKey =
        run {
            // 秘密鍵の長さチェック（最低32バイト = 256ビット）
            require(secret.toByteArray().size >= MIN_SECRET_LENGTH) {
                "JWT secret must be at least 256 bits"
            }
            Keys.hmacShaKeyFor(secret.toByteArray())
        }

    companion object {
        private const val MIN_SECRET_LENGTH = 32
    }

    /**
     * JWTトークンを生成
     *
     * @param userId ユーザーID
     * @return 生成されたJWTトークン
     */
    fun generateToken(userId: UUID): String {
        val now = Date()
        val expiryDate = Date(now.time + expiration)

        return Jwts
            .builder()
            .subject(userId.toString())
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(secretKey)
            .compact()
    }

    /**
     * トークンからユーザーIDを取得
     *
     * @param token JWTトークン
     * @return ユーザーID、トークンが無効な場合はnull
     */
    fun getUserIdFromToken(token: String): UUID? =
        try {
            val claims = parseToken(token)
            UUID.fromString(claims.subject)
        } catch (e: JwtException) {
            logger.debug("Invalid JWT token", e)
            null
        } catch (e: IllegalArgumentException) {
            logger.debug("Invalid UUID in token subject", e)
            null
        }

    /**
     * トークンの有効性を検証
     *
     * @param token JWTトークン
     * @return 有効な場合true、無効な場合false
     */
    fun validateToken(token: String): Boolean =
        try {
            parseToken(token)
            true
        } catch (e: JwtException) {
            logger.debug("Invalid JWT token", e)
            false
        }

    /**
     * トークンをパースしてClaimsを取得（内部用）
     */
    private fun parseToken(token: String): Claims =
        Jwts
            .parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .payload
}
