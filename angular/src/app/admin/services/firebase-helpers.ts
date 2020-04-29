import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';

let initialized = false;

function initializeApp() {
  if (!initialized) {
    const firebaseConfig = {
      apiKey: 'AIzaSyDlvl8kmageQMexFvxOXc6Bqhej01JurFA',
      authDomain: 'jamstack-poc.firebaseapp.com',
      databaseURL: 'https://jamstack-poc.firebaseio.com',
      projectId: 'jamstack-poc',
      storageBucket: 'jamstack-poc.appspot.com',
      messagingSenderId: '488982422210',
      appId: '1:488982422210:web:29bb29cbb28fbdd3de115b',
    };
    firebase.initializeApp(firebaseConfig);
    initialized = true;
  }
}

export function auth() {
  initializeApp();
  return firebase.auth();
}

export function functions() {
  initializeApp();
  return firebase.app().functions('europe-west1');
}
