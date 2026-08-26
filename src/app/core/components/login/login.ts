import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardContent, MatCardFooter } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

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
        <form [formGroup]="loginForm" (submit)="submitLogin()" class="login-form">
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
      </mat-card-content>
    </mat-card>
  `,
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  hidePassword = signal(true);
  toggleHide(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  submitLogin() {
    console.log(this.loginForm.value.login + ' ' + this.loginForm.value.password);
  }

  handleLogIn() {
    this.auth.logIn();
  }
}
