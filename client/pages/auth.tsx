import React, { useState } from "react";

import { Button } from 'react-bootstrap';
import Layout from "../components/Layout";

// Firebase Authentication
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();

// Client-side
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    user.getIdToken().then(function(idToken) {
      // Send token to your server
      console.log(`idToken: ${idToken}`);
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

export default function HelloWorld() {

  const Auth = () => {
    // signInWithPopup or signInWithRedirect
    firebase.auth().signInWithPopup(provider).then(result => {
      console.log(result);
    }).catch(function(err) {
      console.error(err);
    });
  };

  return (
    <Layout>
      <main>
        <div id="Auth">
          <Button variant="primary" onClick={Auth}>認証 🐸</Button>
        </div>
      </main>
    </Layout>
  );
};
