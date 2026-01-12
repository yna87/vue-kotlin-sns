package io.github.yna87.vuekotlinsns.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

/**
 * サインアップリクエスト
 */
data class SignupRequest(
    @field:NotBlank(message = "ユーザー名を入力してください")
    @field:Size(min = 3, max = 50, message = "ユーザー名は3文字以上50文字以内で入力してください")
    @field:Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "ユーザー名は英数字とアンダースコアのみ使用できます")
    val userName: String,
    @field:NotBlank(message = "表示名を入力してください")
    @field:Size(min = 1, max = 100, message = "表示名は1文字以上100文字以内で入力してください")
    val displayName: String,
    @field:NotBlank(message = "パスワードを入力してください")
    @field:Size(min = 8, message = "パスワードは8文字以上で入力してください")
    val password: String,
)
