import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationError } from '@angular/forms/signals';

export const ipAddressValidator: ValidatorFn = (
  control: AbstractControl<string>,
): ValidationErrors | null => {
  console.log(control.value);
  const address = control.value;
  const regex = /^(((?!25?[6-9])[12]\d|[1-9])?\d\.?\b){4}$/;

  if (!address) return null;

  const isAddressCorrect = regex.test(address);

  if (!isAddressCorrect) {
    return {
      wrongAddressFormat: true,
    };
  }

  return null;
};
