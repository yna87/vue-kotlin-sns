package io.github.yna87.vuekotlinsns.entity

import java.time.OffsetDateTime
import java.util.UUID

/**
 * 投稿エンティティ
 */
data class Post(
    val id: UUID,
    val userId: UUID,
    val content: String,
    val createdAt: OffsetDateTime,
    val user: User,
)
