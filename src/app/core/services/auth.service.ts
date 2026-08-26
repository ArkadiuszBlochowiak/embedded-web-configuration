import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';

@Service()
export class AuthService {
  private readonly LOCALSTORAGE_KEY = 'isLoggedIn';
  private router = inject(Router);

  isLoggedIn = signal<boolean>(localStorage.getItem(this.LOCALSTORAGE_KEY) === 'true');

  logIn(): void {
    localStorage.setItem(this.LOCALSTORAGE_KEY, 'true');
    this.isLoggedIn.set(true);

    this.router.navigate(['/']);
  }

  logOut(): void {
    localStorage.removeItem(this.LOCALSTORAGE_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['login']);
  }
}
