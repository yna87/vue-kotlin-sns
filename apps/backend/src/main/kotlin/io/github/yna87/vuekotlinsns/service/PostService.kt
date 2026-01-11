package io.github.yna87.vuekotlinsns.service

import io.github.yna87.vuekotlinsns.entity.Post
import io.github.yna87.vuekotlinsns.repository.PostRepository
import org.springframework.stereotype.Service

/**
 * 投稿サービス
 */
@Service
class PostService(
    private val postRepository: PostRepository,
) {
    /**
     * すべての投稿を取得
     *
     * @return 投稿リスト（新しい順）
     */
    fun getAllPosts(): List<Post> = postRepository.findAll()

    /**
     * 新しい投稿を作成
     *
     * @param content 投稿本文
     * @return 作成された投稿
     */
    fun createPost(content: String): Post = postRepository.create(content)
}
