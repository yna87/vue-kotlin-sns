package io.github.yna87.vuekotlinsns.repository

import io.github.yna87.vuekotlinsns.entity.Post
import java.util.UUID

/**
 * 投稿リポジトリインターフェース
 */
interface PostRepository {
    /**
     * すべての投稿を新しい順で取得
     *
     * @return 投稿リスト（created_at降順）
     */
    fun findAll(): List<Post>

    /**
     * 新しい投稿を作成
     *
     * @param userId 投稿者のユーザーID
     * @param content 投稿本文
     * @return 作成された投稿
     */
    fun create(
        userId: UUID,
        content: String,
    ): Post
}
