import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';

@Service()
export class AuthService {
  private readonly LOCALSTORAGE_KEY = 'isLoggedIn';
  private router = inject(Router);

  isLoggedIn = signal<boolean>(localStorage.getItem(this.LOCALSTORAGE_KEY) === 'true');

  navigateToHomePage(): void {
    this.router.navigate(['/']);
  }

  logIn(): void {
    localStorage.setItem(this.LOCALSTORAGE_KEY, 'true');
    this.isLoggedIn.set(true);

    this.navigateToHomePage();
  }

  logOut(): void {
    localStorage.removeItem(this.LOCALSTORAGE_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['login']);
  }
}
