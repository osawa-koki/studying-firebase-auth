import Layout from "../components/Layout";

export default function HelloWorld() {
  return (
    <Layout>
      <main>
        <div id="About">
          <h1>Here, About page.</h1>
          <p>認証を簡単に実現するサービス"Firebase Authentication"を試してみます。<br />比較的簡単に導入可能で、運用もしやすいのですが、公式ドキュメントが詳しくありません、、、泣</p>
        </div>
      </main>
    </Layout>
  );
};
