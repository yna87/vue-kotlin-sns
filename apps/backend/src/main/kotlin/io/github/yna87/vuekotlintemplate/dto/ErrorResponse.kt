package io.github.yna87.vuekotlintemplate.dto

import com.fasterxml.jackson.annotation.JsonInclude

/**
 * エラーレスポンス
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class ErrorResponse(
    val type: String,
    val message: String,
    val details: List<FieldError>? = null,
)

/**
 * フィールドエラー詳細
 */
data class FieldError(
    val field: String,
    val message: String,
)
