package io.github.yna87.vuekotlintemplate.config

import org.jetbrains.exposed.sql.Database
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.sql.DataSource

/**
 * Exposed データベース設定
 */
@Configuration
class DatabaseConfig {
    /**
     * Exposedのデータベースインスタンスを作成
     * Spring BootのDataSourceから接続を取得
     *
     * @param dataSource Spring Bootが管理するDataSource
     * @return Exposedのデータベースインスタンス
     */
    @Bean
    fun database(dataSource: DataSource): Database = Database.connect(dataSource)
}
