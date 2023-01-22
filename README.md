# simple-next-study.ssg.ts

Firebase Authenticationを使った認証処理のサンプルです。  
簡単に認証処理を実装できます。  

## 実行方法

```shell
# モジュールのインストール
yarn

# 開発用実行
yarn dev

# ビルド
yarn build
```

## イロイロ説明

設定方法は以下の手順で。  

1. Firebaseプロジェクトの作成
2. Firebaseアプリの作成
3. Authenticationの有効化
4. 初期化
5. 認証処理の登録

### 1. Firebaseプロジェクトの作成

[Firebaseコンソール](https://console.firebase.google.com/u/0/?hl=ja)からプロジェクトを作成します。  
プロジェクト名は適当でOKです。  

![プロジェクトの作成](.development/img/create-project.png)  

### 2. Firebaseアプリの作成

作成したプロジェクトの「アプリ」からアプリを作成します。  
アプリ名は適当でOKです。  

![アプリの作成](.development/img/create-app.png)  

### 3. Authenticationの有効化

作成したアプリの「Authentication」から必要な認証方法を有効化します。  
ここではGoogle認証を有効化します。  

![Authenticationの有効化](./.development/img/auth.png)  

同時に使用する認証方法を有効化します。  

![Authenticationの有効化](./.development/img/auth-method.png)  

### 4. 初期化

既にコード内に記載済みです。  

```ts
// Firebase Authentication
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
onAuthStateChanged(auth, user => { console.log(user); });

const provider = new firebase.auth.GoogleAuthProvider();
```

最初に`yarn add firebase`でFirebaseをインストールします。  

設定ファイルは`firebaseConfig.ts`として作成します。  
ここにFirebaseアプリ画面から取得した以下のデータを記載します。  

![Firebaseアプリ画面](./.development/img/app-config.png)  

### 5. 認証処理の登録

コード内に記載済みです。  
認証後の処理を記載しています。  

```ts
// 認証処理関数
const Auth = () => {
  // signInWithPopup or signInWithRedirect
  // SignInWithPopupはポップアップで認証画面を表示
  // SignInWithRedirectはリダイレクトで認証画面を表示
  firebase.auth().signInWithPopup(provider).then(result => {
    console.log(result);
  }).catch(function(err) {
    console.error(err);
  });
};
```
