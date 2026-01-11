.PHONY: help dev dev-frontend dev-backend

help: ## ヘルプメッセージを表示
	@printf "利用可能なコマンド:\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  make %-15s %s\n", $$1, $$2}'

dev: ## フロントエンドとバックエンドを同時に起動
	@printf "Starting backend and frontend...\n"
	@trap 'kill 0' INT; \
	(cd apps/backend && ./gradlew bootRun 2>&1 | sed "s/^/[BACKEND] /") & \
	(cd apps/frontend && pnpm run dev 2>&1 | sed "s/^/[FRONTEND] /") & \
	wait

dev-frontend: ## フロントエンドのみ起動
	@printf "Starting frontend...\n"
	@cd apps/frontend && pnpm run dev

dev-backend: ## バックエンドのみ起動
	@printf "Starting backend...\n"
	@cd apps/backend && ./gradlew bootRun
