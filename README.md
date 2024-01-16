# cool-text-converter

入力値を良い感じに解釈して、markdown とかに良い感じに変換する

以下のURLでデプロイされている
https://cool-text-converter.vercel.app

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
// install supported browsers
npx playwright install

npm run test

// スナップショットの更新
npm run test:u
```

## E2Eテスト
### test
```
npm run test:e2e-local
# UI操作モード
npm run test:e2e-local -- --ui
# テストレポート表示
npm run report:e2e
```

### テスト生成
```
npm run dev
npx playwright codegen localhost:5173
```


## ビルド
```
npm run build
```

## data-testid命名規則

```
<コンポーネント種別>:<該当コンポーネント名>:<対象の要約>
```

例えばmarkdownのconvert画面の入力フォームは以下の通り
```
text-area:markdown-convert-page:src-input
```

## その他技術的なところ
勉強のために色々盛り込んでみた

- 単体テストに加えてE2E
- 単体テスト/lintをCIで回す
- CDはVercel
- E2E tests workflowはGithub Actions上で手動で実行できる
