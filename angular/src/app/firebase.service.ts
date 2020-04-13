import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user$: Observable<firebase.User>;
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
    const userSubject = new Subject<firebase.User>();
    this.user$ = userSubject.pipe(shareReplay(1));
    firebase.auth().onIdTokenChanged(userSubject);
  }

  async login(email: string, password: string): Promise<void> {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    await firebase.auth().signOut();
  }

  async saveUserData(text: string): Promise<void> {
    const saveUserData = firebase.functions().httpsCallable('saveUserData');
    await saveUserData({ text });
  }
}
