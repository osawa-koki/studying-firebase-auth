import React, { useState } from "react";

import { Button } from 'react-bootstrap';
import Layout from "../components/Layout";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { onAuthStateChanged } from 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDp0_U8B9ZM4mRequ0v5IjPpaLQHdNc8_8",
  authDomain: "learning-firebaseauth.firebaseapp.com",
  projectId: "learning-firebaseauth",
  storageBucket: "learning-firebaseauth.appspot.com",
  messagingSenderId: "627247538001",
  appId: "1:627247538001:web:352cb8cbc290393053bd70",
  measurementId: "G-F4SMG2381F",
});
const auth = firebaseApp.auth();
onAuthStateChanged(auth, user => { console.log(user); });

const provider = new firebase.auth.GoogleAuthProvider();

export default function HelloWorld() {

  const Auth = () => {
    // signInWithPopup or signInWithRedirect
    firebase.auth().signInWithPopup(provider).then(result => {
      console.log(result)
    }).catch(function(err) {
      console.error(err)
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
