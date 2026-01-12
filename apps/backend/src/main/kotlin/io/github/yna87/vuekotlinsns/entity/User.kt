package io.github.yna87.vuekotlinsns.entity

import java.time.OffsetDateTime
import java.util.UUID

/**
 * ユーザーエンティティ
 */
data class User(
    val id: UUID,
    val userName: String,
    val displayName: String,
    val passwordHash: String,
    val createdAt: OffsetDateTime,
)
