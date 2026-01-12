package io.github.yna87.vuekotlinsns.service

import io.github.yna87.vuekotlinsns.dto.AuthResponse
import io.github.yna87.vuekotlinsns.dto.LoginRequest
import io.github.yna87.vuekotlinsns.dto.SignupRequest
import io.github.yna87.vuekotlinsns.dto.UserResponse
import io.github.yna87.vuekotlinsns.exception.DuplicateResourceException
import io.github.yna87.vuekotlinsns.exception.ResourceNotFoundException
import io.github.yna87.vuekotlinsns.exception.UnauthorizedException
import io.github.yna87.vuekotlinsns.repository.UserRepository
import io.github.yna87.vuekotlinsns.security.JwtUtil
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.UUID

/**
 * 認証サービス
 */
@Service
class AuthService(
    private val userRepository: UserRepository,
    private val jwtUtil: JwtUtil,
) {
    private val passwordEncoder = BCryptPasswordEncoder()

    /**
     * ユーザーサインアップ
     *
     * @param request サインアップリクエスト
     * @return 認証レスポンス（JWTトークンとユーザー情報）
     * @throws DuplicateResourceException ユーザー名が既に存在する場合
     */
    fun signup(request: SignupRequest): AuthResponse {
        // ユーザー名の重複チェック
        if (userRepository.findByUserName(request.userName) != null) {
            throw DuplicateResourceException("ユーザー名は既に使用されています")
        }

        // パスワードをハッシュ化
        val passwordHash = passwordEncoder.encode(request.password)!!

        // ユーザーを作成
        val user =
            userRepository.create(
                userName = request.userName,
                displayName = request.displayName,
                passwordHash = passwordHash,
            )

        // JWTトークンを生成
        val token = jwtUtil.generateToken(user.id)

        return AuthResponse(
            token = token,
            user = UserResponse.from(user),
        )
    }

    /**
     * ユーザーログイン
     *
     * @param request ログインリクエスト
     * @return 認証レスポンス（JWTトークンとユーザー情報）
     * @throws UnauthorizedException ユーザー名またはパスワードが正しくない場合
     */
    fun login(request: LoginRequest): AuthResponse {
        // ユーザー名でユーザーを検索
        val user =
            userRepository.findByUserName(request.userName)
                ?: throw UnauthorizedException("ユーザー名またはパスワードが正しくありません")

        // パスワードを検証
        if (!passwordEncoder.matches(request.password, user.passwordHash)) {
            throw UnauthorizedException("ユーザー名またはパスワードが正しくありません")
        }

        // JWTトークンを生成
        val token = jwtUtil.generateToken(user.id)

        return AuthResponse(
            token = token,
            user = UserResponse.from(user),
        )
    }

    /**
     * 現在のユーザー情報を取得
     *
     * @param userId ユーザーID
     * @return ユーザー情報
     * @throws ResourceNotFoundException ユーザーが見つからない場合
     */
    fun getCurrentUser(userId: UUID): UserResponse {
        val user =
            userRepository.findById(userId)
                ?: throw ResourceNotFoundException("ユーザーが見つかりません")

        return UserResponse.from(user)
    }
}
