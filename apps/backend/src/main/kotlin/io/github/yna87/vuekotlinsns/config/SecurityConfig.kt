package io.github.yna87.vuekotlinsns.config

import io.github.yna87.vuekotlinsns.security.JwtAuthenticationEntryPoint
import io.github.yna87.vuekotlinsns.security.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

/**
 * セキュリティ設定
 */
@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
    private val jwtAuthenticationEntryPoint: JwtAuthenticationEntryPoint,
) {
    /**
     * パスワードエンコーダー（BCrypt）を提供
     *
     * @return BCryptPasswordEncoderインスタンス
     */
    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    /**
     * セキュリティフィルターチェーンの設定
     *
     * @param http HttpSecurityオブジェクト
     * @return SecurityFilterChain
     */
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .csrf { it.disable() }
            .authorizeHttpRequests { authorize ->
                authorize
                    // 認証不要なエンドポイント
                    .requestMatchers("/auth/signup", "/auth/login")
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, "/posts")
                    .permitAll()
                    // 認証必須なエンドポイント
                    .requestMatchers("/auth/me")
                    .authenticated()
                    .requestMatchers(HttpMethod.POST, "/posts")
                    .authenticated()
                    // その他のリクエストは認証必須
                    .anyRequest()
                    .authenticated()
            }.sessionManagement { session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }.exceptionHandling { exception ->
                exception.authenticationEntryPoint(jwtAuthenticationEntryPoint)
            }.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
            .build()
}
