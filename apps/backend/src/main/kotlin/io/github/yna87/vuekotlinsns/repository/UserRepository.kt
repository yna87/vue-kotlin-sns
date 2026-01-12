package io.github.yna87.vuekotlinsns.repository

import io.github.yna87.vuekotlinsns.entity.User
import java.util.UUID

/**
 * ユーザーリポジトリインターフェース
 */
interface UserRepository {
    /**
     * ユーザー名でユーザーを検索
     *
     * @param userName ユーザー名
     * @return ユーザー（存在しない場合はnull）
     */
    fun findByUserName(userName: String): User?

    /**
     * IDでユーザーを検索
     *
     * @param id ユーザーID
     * @return ユーザー（存在しない場合はnull）
     */
    fun findById(id: UUID): User?

    /**
     * 新しいユーザーを作成
     *
     * @param userName ユーザー名
     * @param displayName 表示名
     * @param passwordHash パスワードハッシュ
     * @return 作成されたユーザー
     */
    fun create(
        userName: String,
        displayName: String,
        passwordHash: String,
    ): User
}
