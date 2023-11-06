# graphql sample

バックエンドの GraphQL サーバを起動し、クライアントの React プロジェクトから呼び出すサンプル

## Required

- Docker Desktop
- npm >=8 & node >= 16

## Quick Start

### ターミナル 1(サーバ)

1. DB の起動

   ```console
   # serverディレクトリに移動
   $ cd server

   # node_modulesのダウンロード
   $ npm install

   # MySQLコンテナの起動
   $ make db/up

   # MySQLサーバの初期化
   $ make db/init
   ```

2. GraphQL サーバの起動

   ```console
   # GraphQLサーバを起動
   $ npm run dev
   ```

▽ 作業が終了したら docker コンテナを削除しましょう

```console
$ make db/down
```

### ターミナル 2(クライアント)

1. simple_fetch_client, graphql_request_client, apollo_client から好きなものを選ぶ

2. クライアントを起動する(ブラウザが自動で立ち上がります)

   ```console
   # node_modulesのダウンロード
   $ npm install

   # クライアント起動
   $ npm run dev
   ```

## MySQL のテーブルを閲覧したい場合

- 方法 1: [sequel-ace](https://sequel-ace.com/)を install する
  - Host: localhost
  - Username: root
  - Password: root-password
  - Database: graphql_test
  - Port: 3306 (default)
- 方法 2: `npm run studio`で、prisma studio を立ち上げる
- 方法 3: Docker コンテナに入る
  ```console
  $ docker container exec -it graphql-mysql-sample bash
  $ mysql -u root -p
  >> root-password
  $ show databases;
  $ show tables from graphql_test;
  $ use graphql_test;
  $ select * from <table名>;
  $ exit
  $ exit
  ```
