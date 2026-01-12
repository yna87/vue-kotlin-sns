package io.github.yna87.vuekotlinsns.repository

import io.github.yna87.vuekotlinsns.entity.Post
import io.github.yna87.vuekotlinsns.table.PostsTable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.insertReturning
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.stereotype.Repository

/**
 * 投稿リポジトリ実装
 */
@Repository
class PostRepositoryImpl : PostRepository {
    override fun findAll(): List<Post> =
        transaction {
            PostsTable
                .selectAll()
                .orderBy(PostsTable.createdAt, SortOrder.DESC)
                .map { it.toPost() }
        }

    override fun create(content: String): Post =
        transaction {
            PostsTable
                .insertReturning {
                    it[PostsTable.content] = content
                    // createdAtはDB側のDEFAULT値を使用
                }.single()
                .toPost()
        }

    /**
     * ResultRowをPostエンティティに変換
     */
    private fun ResultRow.toPost() =
        Post(
            id = this[PostsTable.id],
            content = this[PostsTable.content],
            createdAt = this[PostsTable.createdAt],
        )
}
