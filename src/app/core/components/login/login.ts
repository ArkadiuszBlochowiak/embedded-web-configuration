import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardContent, MatCardFooter } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValueChangeEvent,
} from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { formValidator } from '../../services/login.validator';
import { filter } from 'rxjs';

@Component({
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatError,
  ],
  selector: 'app-login',
  styleUrl: './login.css',
  // templateUrl: './login.html',
  template: `
    <mat-card appearance="outlined" class="login-card">
      <mat-card-header>
        <p>Login page</p>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="loginForm" (submit)="onSubmit()" class="login-form">
          <mat-form-field>
            <mat-label>Login</mat-label>
            <input matInput formControlName="login" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Password</mat-label>
            <input
              matInput
              [type]="hidePassword() ? 'password' : 'text'"
              formControlName="password"
            />
            <button
              matIconButton
              matSuffix
              (click)="toggleHide($event)"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="hidePassword()"
            >
              <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>
          <button matButton="filled" type="submit">Log In</button>
        </form>
        @if (loginForm.hasError('missmatchedCredentials') && isInvalid()) {
          <mat-error>Invalid login or password</mat-error>
        }
      </mat-card-content>
    </mat-card>
  `,
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);

  hidePassword = signal(true);
  isInvalid = signal(false);

  constructor() {
    this.loginForm.events
      .pipe(filter((e) => e instanceof ValueChangeEvent))
      .subscribe(() => this.isInvalid.set(false));
  }

  loginForm = new FormGroup(
    {
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },
    { validators: [formValidator] },
  );

  toggleHide(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isInvalid.set(false);
      this.auth.logIn();
    } else {
      this.isInvalid.set(true);
    }
  }
}
