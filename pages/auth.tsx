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
onAuthStateChanged(auth, user => { console.log(auth, user); });

const provider = new firebase.auth.GoogleAuthProvider();

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
