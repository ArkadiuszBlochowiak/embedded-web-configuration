import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.css',
  // templateUrl: './login.html',
  template: `
    <p>Login page</p>
    <button (click)="handleLogIn()">Log In</button>
  `,
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);

  handleLogIn() {
    this.auth.logIn();
  }
}
