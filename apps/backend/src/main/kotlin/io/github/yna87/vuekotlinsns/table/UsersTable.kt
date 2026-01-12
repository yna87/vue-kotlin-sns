package io.github.yna87.vuekotlinsns.table

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.timestampWithTimeZone

/**
 * ユーザーテーブル定義
 */
object UsersTable : Table("users") {
    private const val USER_NAME_LENGTH = 50
    private const val DISPLAY_NAME_LENGTH = 100
    private const val PASSWORD_HASH_LENGTH = 60

    val id = uuid("id").autoGenerate()
    val userName = varchar("user_name", USER_NAME_LENGTH)
    val displayName = varchar("display_name", DISPLAY_NAME_LENGTH)
    val passwordHash = varchar("password_hash", PASSWORD_HASH_LENGTH)
    val createdAt = timestampWithTimeZone("created_at").databaseGenerated()

    override val primaryKey = PrimaryKey(id)
}
