import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';

let initialized = false;

function initializeApp() {
  if (!initialized) {
    firebase.initializeApp({
      apiKey: 'AIzaSyCeT1s5vaxl1beFY-I2ISrB6kKgJRSfWPY',
      authDomain: 'update-github-poc.firebaseapp.com',
      databaseURL: 'https://update-github-poc.firebaseio.com',
      projectId: 'update-github-poc',
      storageBucket: 'update-github-poc.appspot.com',
      messagingSenderId: '180636128882',
      appId: '1:180636128882:web:748a5791d6fc684a8f94eb',
    });
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
