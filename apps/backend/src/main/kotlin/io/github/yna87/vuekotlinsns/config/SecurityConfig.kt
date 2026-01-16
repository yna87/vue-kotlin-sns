package io.github.yna87.vuekotlinsns.config

import io.github.yna87.vuekotlinsns.security.JwtAuthenticationEntryPoint
import io.github.yna87.vuekotlinsns.security.JwtAuthenticationFilter
import org.springframework.beans.factory.annotation.Value
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
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

/**
 * セキュリティ設定
 */
@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
    private val jwtAuthenticationEntryPoint: JwtAuthenticationEntryPoint,
) {
    @Value("\${cors.allowed-origins}")
    private lateinit var allowedOrigins: String

    /**
     * パスワードエンコーダー（BCrypt）を提供
     *
     * @return BCryptPasswordEncoderインスタンス
     */
    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    /**
     * CORS設定を提供
     *
     * @return CorsConfigurationSource
     */
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = allowedOrigins.split(",").map { it.trim() }
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
        configuration.allowedHeaders =
            listOf(
                "Authorization",
                "Content-Type",
            )
        configuration.allowCredentials = true
        // プリフライトリクエストのキャッシュ時間（秒）
        configuration.maxAge = 3600L

        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

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
            .cors { }
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
