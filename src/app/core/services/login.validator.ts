import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const LOGIN_CREDENTIAL = 'admin';

export const formValidator: ValidatorFn = (
  control: AbstractControl<string>,
): ValidationErrors | null => {
  const login = control.get('login')?.value?.trim().toLowerCase();
  const password = control.get('password')?.value?.trim().toLowerCase();

  if (!login || !password) {
    return null;
  }

  const isCorrect = login === LOGIN_CREDENTIAL;

  if (!isCorrect) {
    return {
      missmatchedCredentials: true,
    };
  }

  return null;
};
