import express from 'express';
import admin from 'firebase-admin';

const app = express();

// Initialize the Firebase Admin SDK with the service account credentials.
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'your-project-id',
    clientEmail: 'your-client-email',
    privateKey: 'your-private-key'
  }),
});

app.use((req, res, next) => {
  // Get the ID token passed in the Authorization header.
  const idToken = req.headers.authorization;

  if (!idToken) {
    res.status(401).send({error: 'Unauthorized'});
    return;
  }

  // Verify the ID token passed by the client.
  admin.auth().verifyIdToken(idToken)
    .then((decodedIdToken) => {
      // The ID token is valid and the claims can be read.
      // req.user = decodedIdToken;
      next();
    })
    .catch((error) => {
      // The ID token is invalid or the claims can't be read.
      res.status(401).send({error: 'Unauthorized'});
    });
});

app.get('/auth', (req, res) => {
  res.send({ verified: true });
});

app.listen(3000);
