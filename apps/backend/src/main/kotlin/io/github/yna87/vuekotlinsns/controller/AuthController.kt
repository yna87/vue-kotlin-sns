package io.github.yna87.vuekotlinsns.controller

import io.github.yna87.vuekotlinsns.dto.AuthResponse
import io.github.yna87.vuekotlinsns.dto.LoginRequest
import io.github.yna87.vuekotlinsns.dto.SignupRequest
import io.github.yna87.vuekotlinsns.dto.UserResponse
import io.github.yna87.vuekotlinsns.security.UserPrincipal
import io.github.yna87.vuekotlinsns.service.AuthService
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
 * 認証コントローラー
 */
@RestController
@RequestMapping("/auth")
class AuthController(
    private val authService: AuthService,
) {
    /**
     * ユーザーサインアップ
     *
     * @param request サインアップリクエスト
     * @return 認証レスポンス（JWTトークンとユーザー情報）
     */
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    fun signup(
        @Valid @RequestBody request: SignupRequest,
    ): AuthResponse = authService.signup(request)

    /**
     * ユーザーログイン
     *
     * @param request ログインリクエスト
     * @return 認証レスポンス（JWTトークンとユーザー情報）
     */
    @PostMapping("/login")
    fun login(
        @Valid @RequestBody request: LoginRequest,
    ): AuthResponse = authService.login(request)

    /**
     * 現在のユーザー情報を取得
     *
     * @param userPrincipal 認証済みユーザー情報
     * @return ユーザー情報
     */
    @GetMapping("/me")
    fun getCurrentUser(
        @AuthenticationPrincipal userPrincipal: UserPrincipal,
    ): UserResponse = authService.getCurrentUser(userPrincipal.userId)
}
