package io.github.yna87.vuekotlinsns.table

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.timestampWithTimeZone

/**
 * ユーザーテーブル定義
 */
object UsersTable : Table("users") {
    val id = uuid("id").autoGenerate()
    val userName = varchar("user_name", 50)
    val displayName = varchar("display_name", 100)
    val passwordHash = varchar("password_hash", 60)
    val createdAt = timestampWithTimeZone("created_at").databaseGenerated()

    override val primaryKey = PrimaryKey(id)
}
