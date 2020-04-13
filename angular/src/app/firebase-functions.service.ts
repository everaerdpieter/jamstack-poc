import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFunctionsService {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCeT1s5vaxl1beFY-I2ISrB6kKgJRSfWPY',
      authDomain: 'update-github-poc.firebaseapp.com',
      databaseURL: 'https://update-github-poc.firebaseio.com',
      projectId: 'update-github-poc',
      storageBucket: 'update-github-poc.appspot.com',
      messagingSenderId: '180636128882',
      appId: '1:180636128882:web:748a5791d6fc684a8f94eb',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  async saveUserData(text: string): Promise<void> {
    const saveUserData = firebase.functions().httpsCallable('saveUserData');
    await saveUserData({ text });
  }
}
