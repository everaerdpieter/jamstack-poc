import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';

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

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.showLogin$ = this.authService.user$.pipe(
      map((user) => user === null),
      startWith(false)
    );
    this.user$ = this.authService.user$;
  }

  async submit() {
    this.errorMessage = null;
    const email = this.formGroup.get('email').value;
    const password = this.formGroup.get('password').value;
    try {
      await this.authService.login(email, password);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async logout() {
    await this.authService.logout();
  }
}
