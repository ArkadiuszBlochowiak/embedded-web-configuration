import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ipAddressValidator: ValidatorFn = (
  control: AbstractControl<string>,
): ValidationErrors | null => {
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

export const submaskValidator: ValidatorFn = (
  control: AbstractControl<string>,
): ValidationErrors | null => {
  const submask = control.value;
  const regex =
    /^(255)\.(0|128|192|224|240|248|252|254|255)\.(0|128|192|224|240|248|252|254|255)\.(0|128|192|224|240|248|252|254|255)/;

  if (!submask) return null;

  const isSubmaskCorrect = regex.test(submask);

  if (!isSubmaskCorrect) {
    return {
      wrongSubmaskFormat: true,
    };
  }

  return null;
};
