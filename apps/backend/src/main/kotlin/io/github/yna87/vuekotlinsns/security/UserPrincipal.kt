package io.github.yna87.vuekotlinsns.security

import java.util.UUID

/**
 * 認証済みユーザーのプリンシパル情報
 *
 * SecurityContextに格納される認証済みユーザーの情報を保持する
 */
data class UserPrincipal(
    val userId: UUID,
)
