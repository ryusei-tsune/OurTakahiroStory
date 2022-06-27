# OurTakahiroStory

## Setup

開発は Docker 環境で行う．

開発時は， docker-compose により Node.js 環境が起動する。起動後，Node.js サービスに接続(docker-compose exec node sh コマンドを使用)し，サーバーを起動する流れとなる．初回実行時は，npm install によって依存関係をインストールする必要あり．

### 初回実行時

```bash
# イメージをビルドする
$ docker-compose build
# 開発環境用のサービスを起動する
$ docker-compose up -d
# Node.js サービスに接続する
$ docker-compose exec node sh
# >>> コンテナに接続されます
# 依存関係のインストール
~/app $ npm install
# 開発環境モードでサーバを起動
# ブラウザのURLに localhost:3000 を入力し，アクセス
~/app $ npm run dev
# 終了時
# [Ctrl] + [C]
~/app $ exit
# >>> コンテナ環境から抜け出します
# Docker サービスを終了する
$ docker-compose down
```

### 二回目以降

```bash
# 開発環境用のサービスを起動する
$ docker-compose up -d
# Node.js サービスに接続する
$ docker-compose exec node sh
# >>> コンテナに接続されます
# 開発環境モードでサーバを起動
# ブラウザのURLに localhost:3000 を入力し，アクセス
~/app $ npm run dev
# 終了時
# [Ctrl] + [C]
~/app $ exit
# >>> コンテナ環境から抜け出します
# Docker サービスを終了する
$ docker-compose down
```

<br>
<br>

## 補足

### https サーバのための一時的な ssl 証明書の作り方

デバイスのジャイロを習得するときに https が必須。

```
openssl req -x509 -newkey rsa:4096 -sha256 \
-nodes -keyout static/ssl_cert/https_server.key.pem \
-out static/ssl_cert/https_server.cert.pem
```

作成後は[二回目以降](#二回目以降)と同じ
