package io.github.yna87.vuekotlinsns.dto

import io.github.yna87.vuekotlinsns.entity.Post
import java.time.OffsetDateTime
import java.util.UUID

/**
 * 投稿レスポンス
 */
data class PostResponse(
    val id: UUID,
    val content: String,
    val createdAt: OffsetDateTime,
) {
    companion object {
        /**
         * EntityからDTOに変換
         */
        fun from(post: Post) =
            PostResponse(
                id = post.id,
                content = post.content,
                createdAt = post.createdAt,
            )
    }
}
