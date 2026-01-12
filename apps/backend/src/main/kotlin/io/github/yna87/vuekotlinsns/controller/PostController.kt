package io.github.yna87.vuekotlinsns.controller

import io.github.yna87.vuekotlinsns.dto.PostRequest
import io.github.yna87.vuekotlinsns.dto.PostResponse
import io.github.yna87.vuekotlinsns.security.UserPrincipal
import io.github.yna87.vuekotlinsns.service.PostService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

/**
 * 投稿コントローラー
 */
@RestController
@RequestMapping("/posts")
class PostController(
    private val postService: PostService,
) {
    /**
     * 投稿一覧取得
     *
     * @return 投稿一覧（新しい順）
     */
    @GetMapping
    fun getPosts(): List<PostResponse> = postService.getAllPosts().map { PostResponse.from(it) }

    /**
     * 投稿作成
     *
     * @param userPrincipal 認証済みユーザー情報
     * @param request 投稿作成リクエスト
     * @return 作成された投稿
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createPost(
        @AuthenticationPrincipal userPrincipal: UserPrincipal,
        @Valid @RequestBody request: PostRequest,
    ): PostResponse {
        val post = postService.createPost(userPrincipal.userId, request.content)
        return PostResponse.from(post)
    }
}
