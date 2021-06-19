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
        aws configure [--profile <PROFILE_NAME>]
        ```


### アプリの利用

1. AWSへの接続設定

    AWSへの接続設定は以下の環境変数で与えます。
    アプリケーションと同一階層に `.env` ファイルに定義しても動作します。

    ```
    AWS_CREDENTIALS_PROFILE=<AWSへ接続するユーザーのプロファイル名>
    AWS_CREDENTIALS_REGION=<利用するリージョン名>
    AWS_S3_BUCKET_NAME=<利用するS3バケット名>
    ```

2. アプリの実行

    ビルド済みバイナリファイルを利用する場合、以下のコマンドで実行します。
    Node.js のインストールは不要で Windows, macOS, Linux 環境それぞれ向けのファイルをそのまま実行できます。

    ```
    speach2text <voice_file> <keyword1> <keyword2> ...
    ```

    出力は以下のような形式で コンソール および CSVファイル(Shift-JIS) に出力されます。
    CSVファイルは直接Excelで開けます。

    ```
    [Input]
    吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。
    [Keywords]
    名前,猫
    [Detected]
    index,word,window
    3,猫,吾輩は猫である。名
    8,名前,猫である。名前はまだ無い
    ```

    (*) 実行例

    ```
    PS > .\speach2text-win.exe .\public_audio_ja-JP_Broadband-sample.wav 音声 認識
    ```

## ビルド

独自にビルドしたい場合、以下のコマンドでビルドできます。
ビルド環境には Node.js が必要です。
環境に応じたバイナリが `./dist` 以下に出力されます。

```
npm run build
```

## テスト

単体テストを実行する場合、以下のコマンドで実行します。
テストケースは `./test` 以下にあります。

```
npm test
```

## 実装に関する情報

開発/動作確認は以下の環境で行っています。

* Windows 10 Pro ビルド 19042.1052
* Visual Studio Code 1.57.1
* Node.js v16.3.0

