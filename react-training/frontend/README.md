# 顧客管理システム
顧客管理システムのフロントエンド（基盤）

フレームワーク : React(TypeScript)

相関バックエンドプロジェクト: [backend](https://github.com/xon-synapse-i/shigei_cho/tree/main/spring-backend)

## 項目作成について

Reactプロジェクト作成: [Create React App](https://github.com/facebook/create-react-app)

Reactプロジェクト起動:[npm start] → デフォルト[http://localhost:3000](http://localhost:3000)

## メインファイル構成

```
frontend/...................ルートディレクトリ  
    └── .devcontainer/..........DevContainerの設定ファイルが置かれるディレクトリ  
            ├── devcontainer.json...DevContainerの設定ファイル.Dockerコンテナの構築方法、Visual Studio Codeの設定などが記述されます。 
            └── Dockerfile..........Dockerコンテナの構築に必要なDockerfile.コンテナイメージにインストールするパッケージ、ライブラリ、設定など  が記述されます。   
    └── frontend/...............アプリケーションのソースコードが置かれるディレクトリ(このディレクトリの下で起動)  
            └── src/................画面のフォルダがここで保存されている  
                ├── component/......共通的なコンポーネント(上のツールバー、左のメニュー、アラート、ダイアログ)がここで作成されている  
                ├── Constant/.......定数内容をここで定義されている  
                ├── Context/........コンテクストファイルがここで作成されている  
                ├── Modal/..........モーダル画面がここで作成されている  
                ├── Pages/..........各主要画面がここで作成されている  
                ├── index.tsx.......画面はこのファイルからrenderする  
                ├── App.tsx.........ユーザーコンテクストのProviderがここから設定して、Providerがここから設定する  
                └── Layout.tsx......画面の一番上、ルートの設定がここで行われる  
```

## 利用手順

### 画面構成と機能

```
ログイン ....................ユーザーアカウントとパスワードでログインできる
    └── 一覧画面.............全部顧客情報を一覧できる(各顧客の情報を変更できる、顧客を削除できる)
            ├──  検索画面....顧客名前とIDのキーワード入力で検索できる画面
            └──  追加画面....新しい顧客を追加する画面
```      
　　　　　　　　
### ユーザーアカウント

デフォルトアカウントが以下となる

・ アカウント:lilrin

・ パスワード:Xon123

- 一回ログインして、有効時間は10分
- アカウント登録は未実装...
- アカウントとパスワードのチェックメッセージは未実装...但しコンソールで情報が出る

### 顧客一覧

- ログインしたら、顧客一覧画面はシステムのデフォルト画面
- メニューの「Home」アイコンを押して、顧客一覧画面を表示する
- 「Edit」ボタンを押して、当該顧客の情報変更できる
- 複数の顧客を選定したら、「Delete」ボタンを押して、一括削除できる
- メニューの「Search」アイコンを押して、顧客検索画面へ遷移する
- メニューの「Create」アイコンを押して、顧客追加画面へ遷移する
- メニューの「Logout」アイコンを押して、ログイン画面へ戻る

### 顧客検索

- 顧客名前とIDのキーワード入力で複数の顧客を検索できる

### 顧客追加

- 名前,メールと電話番号を入力し、新規顧客を追加できる


作成者 : LilRin