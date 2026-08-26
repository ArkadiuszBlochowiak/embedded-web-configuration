import { FormControl, FormGroup } from '@angular/forms';
import { formValidator } from './login.validator';

describe('LoginValidator', () => {
  const createForm = (login = '', password = '') => {
    return new FormGroup({
      login: new FormControl(login),
      password: new FormControl(password),
    });
  };

  it('should return null if credentials are valid', () => {
    const form = createForm('admin', 'admin');
    const validatorResult = formValidator(form);

    expect(validatorResult).toBeNull();
  });

  it('should return mismatchedCredentials error if credentials are invalid', () => {
    const form = createForm('test', 'abc');
    const validatorResult = formValidator(form);

    expect(validatorResult).toEqual({
      mismatchedCredentials: true,
    });
  });
});
