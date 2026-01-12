package io.github.yna87.vuekotlinsns.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

/**
 * セキュリティ設定
 */
@Configuration
class SecurityConfig {
    /**
     * パスワードエンコーダー（BCrypt）を提供
     *
     * @return BCryptPasswordEncoderインスタンス
     */
    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()
}
