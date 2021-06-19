# Speach to Text sample application

"AWS TranscribeService" を利用した「音声→文字列変換、文字列検索」を行うアプリケーションです。

## 使い方

### AWSの利用準備

1. 接続ユーザー

AWSへ接続するユーザーを作成します。
権限はサンプルなのでいったん AdministratorAccess で設定します。

2. S3バケット

音声ファイルをアップロードする先となるバケットを準備します。
１で作成したユーザーおよび TranscribeService からアクセスできるようにしておきます。

3. AWS CLI のインストール/初期化

アプリを実行するローカル環境に AWS CLI をインストールし、初期設定を行います。
AWS への接続は プロファイル を利用した接続を行います（＝アクセスキー、シークレットキーは直接指定しません）。

- AWS CLI ダウンロード

https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2.html

- AWS CLI 初期化

```
aws configure
```


### アプリの利用

1. AWSへの接続設定

AWSへの接続設定は環境変数で与えます。

```
AWS_CREDENTIALS_PROFILE=<AWSへ接続するユーザーのプロファイル名>
AWS_CREDENTIALS_REGION=<利用するリージョン名>
AWS_S3_BUCKET_NAME=<利用するS3バケット名>
```

3. アプリの実行
ビルド済みバイナリファイルを利用する場合、以下のコマンドで実行します。
Node.js のインストールは不要でそのまま実行できます。

```
speach2text <voice_file> <keyword1> <keyword2> ...
```

出力は以下のような LTSV 形式でコンソールに出力されます。

```
index: 0	word: "音声"	window: "音声認識の現状"
index: 2	word: "認識"	window: "音声認識の現状につ"
index: 31	word: "音声"	window: "い最近では音声認識でもデ"
index: 33	word: "認識"	window: "近では音声認識でもディー"
```

## ビルド

Windows以外の環境で利用したい場合、以下のコマンドでビルドします。
ビルド環境には Node.js が必要です。
環境に応じたバイナリが `./dist/speach2text` に出力されますが、ビルド環境に含まれる Node.js ではなく 14.15.3 固定で出力されます。

```
npm run build
```

## テスト

単体テストを実行する場合、以下のコマンドで実行します。
テストケースは `./test` 以下にあります。

```
npm test
```
