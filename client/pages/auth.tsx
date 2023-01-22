import React, { useState } from "react";

import { Button, Table } from 'react-bootstrap';
import Layout from "../components/Layout";

// Firebase Authentication
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export default function HelloWorld() {

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const Auth = () => {
    // signInWithPopup or signInWithRedirect
    firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = result.credential as firebase.auth.OAuthCredential;
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setUsername(user?.displayName || '');
      setEmail(user?.email || '');
    }).catch(function(err) {
      console.error(err);
    });
  };

  // Client-side
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user.getIdToken().then(function(idToken) {
        // Send token to your server
        console.log(`idToken: ${idToken}`);
        setToken(idToken);
        // fetch('/auth', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${idToken}`
        //   }
        // });
      });
    } else {
      // User is signed out.
    }
  });

  return (
    <Layout>
      <main>
        <div id="Auth">
          <Button variant="primary" onClick={Auth}>認証 🐸</Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>パラメタ</th>
                <th>バリュー</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>username</th>
                <td>{username}</td>
              </tr>
              <tr>
                <th>email</th>
                <td>{email}</td>
              </tr>
              <tr>
                <th>token</th>
                <td>{token}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </main>
    </Layout>
  );
};
