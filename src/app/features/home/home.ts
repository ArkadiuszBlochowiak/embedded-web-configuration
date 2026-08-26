import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  // templateUrl: './home.html',
  template: `
    <p>Home page</p>
    <button (click)="auth.logOut()">Log out</button>
  `,
})
export class Home {
  auth = inject(AuthService);
}
