import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { tap, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string;
  user$: Observable<firebase.User>;
  showLogin$: Observable<boolean>;
  showLogout$: Observable<boolean>;

  constructor(private readonly firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.showLogin$ = this.firebaseService.user$.pipe(
      map((user) => user === null),
      startWith(false)
    );
    this.user$ = this.firebaseService.user$;
  }

  async submit() {
    this.errorMessage = null;
    const email = this.formGroup.get('email').value;
    const password = this.formGroup.get('password').value;
    try {
      await this.firebaseService.login(email, password);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async logout() {
    await this.firebaseService.logout();
  }
}
