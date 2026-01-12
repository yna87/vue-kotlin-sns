package io.github.yna87.vuekotlinsns.repository

import io.github.yna87.vuekotlinsns.entity.User
import io.github.yna87.vuekotlinsns.table.UsersTable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insertReturning
import org.jetbrains.exposed.sql.selectAll
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

/**
 * ユーザーリポジトリ実装
 */
@Repository
class UserRepositoryImpl : UserRepository {
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

    @Transactional(readOnly = true)
    override fun findByUserName(userName: String): User? {
        return UsersTable
            .selectAll()
            .where { UsersTable.userName eq userName }
            .map { it.toUser() }
            .singleOrNull()
    }

    @Transactional(readOnly = true)
    override fun findById(id: UUID): User? {
        return UsersTable
            .selectAll()
            .where { UsersTable.id eq id }
            .map { it.toUser() }
            .singleOrNull()
    }

    @Transactional
    override fun create(
        userName: String,
        displayName: String,
        passwordHash: String,
    ): User {
        return UsersTable
            .insertReturning {
                it[UsersTable.userName] = userName
                it[UsersTable.displayName] = displayName
                it[UsersTable.passwordHash] = passwordHash
            }
            .single()
            .toUser()
    }
}
