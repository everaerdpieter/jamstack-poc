import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { auth } from './firebase-helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor() {
    const userSubject = new Subject<firebase.User>();
    this.user$ = userSubject.pipe(shareReplay(1));
    auth().onIdTokenChanged(userSubject);
  }

  async login(email: string, password: string): Promise<void> {
    await auth().signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    await auth().signOut();
  }
}
