package io.github.yna87.vuekotlinsns.util

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
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
    private val secretKey: SecretKey = run {
        // 秘密鍵の長さチェック（最低32バイト = 256ビット）
        require(secret.toByteArray().size >= 32) {
            "JWT secret must be at least 256 bits"
        }
        Keys.hmacShaKeyFor(secret.toByteArray())
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

        return Jwts.builder()
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
    fun getUserIdFromToken(token: String): UUID? {
        return try {
            val claims = parseToken(token)
            UUID.fromString(claims.subject)
        } catch (e: Exception) {
            null
        }
    }

    /**
     * トークンの有効性を検証
     *
     * @param token JWTトークン
     * @return 有効な場合true、無効な場合false
     */
    fun validateToken(token: String): Boolean {
        return try {
            parseToken(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    /**
     * トークンをパースしてClaimsを取得（内部用）
     */
    private fun parseToken(token: String): Claims {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .payload
    }
}
