import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const LOGIN_CREDENTIAL = 'admin';

export const formValidator: ValidatorFn = (
  control: AbstractControl<string>,
): ValidationErrors | null => {
  const login = control.get('login')?.value?.trim().toLowerCase();
  const password = control.get('password')?.value?.trim().toLowerCase();

  if (!login || !password) {
    return {
      emptyFields: true,
    };
  }

  const isCorrect = login === LOGIN_CREDENTIAL;

  if (!isCorrect) {
    return {
      mismatchedCredentials: true,
    };
  }

  return null;
};
