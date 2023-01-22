import express from 'express';
import admin from 'firebase-admin';

var serviceAccount = require("./secrets/serviceAccountKey.json");
const app = express();

// Initialize the Firebase Admin SDK with the service account credentials.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use((req, res, next) => {
  // Get the ID token passed in the Authorization header.
  // サブマッチパターンを使って、AuthorizationヘッダーからIDトークンを取得する
  const idToken = req.headers.authorization?.toString().match(/Bearer (?<TOKEN>.*)/)?.groups?.TOKEN;

  if (!idToken) {
    res.status(401).send({
      error: 'Unauthorized',
      message: 'No ID token was passed as a Bearer token in the Authorization header.',
    });
    return;
  }

  // Verify the ID token passed by the client.
  admin.auth().verifyIdToken(idToken, true)
    .then((decodedIdToken) => {
      // The ID token is valid and the claims can be read.
      // req.user = decodedIdToken;
      next();
    })
    .catch((error) => {
      // The ID token is invalid or the claims can't be read.
      res.status(401).send({
        error: 'Unauthorized',
        message: error.message,
      });
    });
});

app.get('/auth', (req, res) => {
  res.send({ verified: true });
});

app.listen(3000);
