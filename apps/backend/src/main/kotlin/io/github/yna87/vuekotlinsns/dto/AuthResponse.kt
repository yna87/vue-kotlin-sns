package io.github.yna87.vuekotlinsns.dto

/**
 * 認証成功レスポンス
 */
data class AuthResponse(
    val token: String,
    val user: UserResponse,
)
