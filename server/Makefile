# DBの起動
.PHONY: db/up
db/up:
	docker compose up -d

# DBの停止
.PHONY: db/down
db/down:
	docker compose down

# DBに初期値を入れる
.PHONY: db/seed
db/seed:
	npx prisma db seed

# DBの初期化
.PHONY: db/init
db/init:
	npm run db:migrate -- --name init && npx prisma db seed

# DBのマイグレーション(2回目以降)
# $ make db/migrate ARG="add_x_column_to_user_table"
.PHONY: db/migrate
db/migrate:
	npm run db:migrate -- --name $(ARG)
