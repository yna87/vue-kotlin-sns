package io.github.yna87.vuekotlinsns.dto

import jakarta.validation.constraints.NotBlank

/**
 * ログインリクエスト
 */
data class LoginRequest(
    @field:NotBlank(message = "ユーザー名を入力してください")
    val userName: String,
    @field:NotBlank(message = "パスワードを入力してください")
    val password: String,
)
