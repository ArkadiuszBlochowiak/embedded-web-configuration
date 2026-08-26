import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { isActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatToolbar, MatIcon, MatButton],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  router = inject(Router);
  auth = inject(AuthService);

  isLoginPageActive = isActive('/login', this.router);
}
