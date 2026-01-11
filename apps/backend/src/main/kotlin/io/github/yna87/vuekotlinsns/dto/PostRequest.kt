package io.github.yna87.vuekotlinsns.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

/**
 * 投稿作成リクエスト
 */
data class PostRequest(
    @field:NotBlank(message = "投稿内容を入力してください")
    @field:Size(max = 280, message = "投稿は280文字以内で入力してください")
    val content: String,
)
