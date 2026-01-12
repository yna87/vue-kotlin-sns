package io.github.yna87.vuekotlinsns.repository

import io.github.yna87.vuekotlinsns.entity.Post
import io.github.yna87.vuekotlinsns.entity.User
import io.github.yna87.vuekotlinsns.table.PostsTable
import io.github.yna87.vuekotlinsns.table.UsersTable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.insertReturning
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.stereotype.Repository
import java.util.UUID

/**
 * 投稿リポジトリ実装
 */
@Repository
class PostRepositoryImpl : PostRepository {
    override fun findAll(): List<Post> =
        transaction {
            PostsTable
                .innerJoin(UsersTable)
                .selectAll()
                .orderBy(PostsTable.createdAt, SortOrder.DESC)
                .map { it.toPost() }
        }

    override fun create(
        userId: UUID,
        content: String,
    ): Post =
        transaction {
            val postId =
                PostsTable
                    .insertReturning {
                        it[PostsTable.userId] = userId
                        it[PostsTable.content] = content
                        // createdAtはDB側のDEFAULT値を使用
                    }.single()[PostsTable.id]

            // 作成した投稿をusersテーブルとJOINして取得
            PostsTable
                .innerJoin(UsersTable)
                .selectAll()
                .where { PostsTable.id eq postId }
                .single()
                .toPost()
        }

    /**
     * ResultRowをPostエンティティに変換
     */
    private fun ResultRow.toPost() =
        Post(
            id = this[PostsTable.id],
            userId = this[PostsTable.userId],
            content = this[PostsTable.content],
            createdAt = this[PostsTable.createdAt],
            user = this.toUser(),
        )

    /**
     * ResultRowをUserエンティティに変換
     */
    private fun ResultRow.toUser() =
        User(
            id = this[UsersTable.id],
            userName = this[UsersTable.userName],
            displayName = this[UsersTable.displayName],
            passwordHash = this[UsersTable.passwordHash],
            createdAt = this[UsersTable.createdAt],
        )
}
