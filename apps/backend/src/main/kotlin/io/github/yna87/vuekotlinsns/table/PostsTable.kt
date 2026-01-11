package io.github.yna87.vuekotlinsns.table

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.timestampWithTimeZone

/**
 * 投稿テーブル定義
 */
object PostsTable : Table("posts") {
    val id = uuid("id").autoGenerate()
    val content = text("content")
    val createdAt = timestampWithTimeZone("created_at")

    override val primaryKey = PrimaryKey(id)
}
