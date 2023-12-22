# cool-text-converter

入力値を良い感じに解釈して、markdown とかに良い感じに変換する

以下のURLでデプロイされている
https://cool-text-converter.vercel.app/markdown/convert

vercel: https://vercel.com/pei223/cool-text-converter


## Setup
以下のツールをインストール
- npm/node
  - bunでも良い

ライブラリのインストール
```
npm i
```

## 動作確認
以下を実行して表示されるURLにアクセス
```
npm run dev
```

## テスト実行
```
npm run test

// スナップショットの更新
npm run test:u
```

## ビルド
```
npm run build
```

## 機能

### markdown

以下のフォーマットは自動解釈が可能.

- URL リンク
- 画像
- JSON

## 今後対応したいもの

### 開発環境
- CIでlint/test
- E2Eテスト


### markdown

- excel ペースト結果をテーブルに
- html テーブルをテーブルに

### 共通

- コピーボタン