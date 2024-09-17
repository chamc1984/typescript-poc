# typescript-poc

## 環境構築

TypeScript でコーディングをする際の環境構築〜プロジェクト生成・実行まで

1. Node.js のインストール
2. プロジェクトの設定ファイルを生成
3. TypeScript のインストール
4. TypeScript の設定ファイルを生成
5. プログラム
6. トランスパイル
7. 実行

### 1. Node.js のインストール（まだの場合）

nvm を利用する場合、まず [公式の GitHub](https://github.com/nvm-sh/nvm) に従ってインストール

その後、希望のバージョンの node をインストール

```sh
% nvm ls-remote
% nvm install {バージョン}
```

### 2. プロジェクトの設定ファイルを生成（package.json）

```sh
% mkdir {ディレクトリ名}
% cd {ディレクトリ名}
% npm init --yes
```

生成された package.json を修正する

```sh
"type": "module" #ファイルの扱いを（スクリプトでなく）モジュールにする
```

### 3. TypeScript のインストール

```sh
% npm install --save-dev typescript @types/node
```

- package.json が更新され、
- package-lock.json が自動生成され、
- node_modules にパッケージがインストールされる

### 4. TypeScript の設定ファイルを生成

```sh
% npx tsc --init
```

自動生成された tsconfig.json を編集する

```sh
"target": "es2020"  # トランスパイル後のバージョン
"module": "esnext"  # モジュールに関する構文の扱い, 古いNode.js なら commonjs
"moduleResolution": "node" # npmでインストールしたモジュールをTypeScriptで認識させる
"outDir": "./dist"  # トランスパイルの出力先
"include": ["./src/**/*.ts"] # compilerOptions と同列に
```

### 5. プログラム

省略

### 6. トランスパイル

```sh
% npx tsc
```

./dist 配下に .js ファイルが生成される

### 7. 実行

```sh
% node dist/main.ts
```
