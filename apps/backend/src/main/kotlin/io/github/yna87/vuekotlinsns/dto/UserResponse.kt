package io.github.yna87.vuekotlinsns.dto

import io.github.yna87.vuekotlinsns.entity.User
import java.util.UUID

/**
 * ユーザー情報レスポンス
 */
data class UserResponse(
    val id: UUID,
    val userName: String,
    val displayName: String,
) {
    companion object {
        fun from(user: User): UserResponse {
            return UserResponse(
                id = user.id,
                userName = user.userName,
                displayName = user.displayName,
            )
        }
    }
}
