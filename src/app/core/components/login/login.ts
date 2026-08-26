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
  templateUrl: './login.html',
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
      this.auth.logIn();
    } else {
      this.isInvalid.set(true);
    }
  }
}
