import { FormControl } from '@angular/forms';
import { ipAddressValidator, submaskValidator } from './settings.validator';

describe('ipAddressValidator', () => {
  const createField = (address = '') => {
    return new FormControl(address);
  };

  test('should return null if address is empty', () => {
    const field = createField();
    const validatorResult = ipAddressValidator(field);

    expect(validatorResult).toBeNull();
  });

  const validTestCases = ['192.168.1.1', '192.128.64.32', '1.1.1.1', '192.64.128.128', '0.0.0.0'];

  test.for(validTestCases)('should return null if address (%s) is in correct format', () => {
    const field = createField('192.168.1.1');
    const validatorResult = ipAddressValidator(field);

    expect(validatorResult).toBeNull();
  });

  const invalidTestCases = [
    '192.168.11',
    '192.168..11',
    '192.168..300',
    '192168111',
    '192..168.11',
  ];

  test.for(invalidTestCases)('should return error if address (%s) is in wrong format', () => {
    const field = createField('192.168.11');
    const validatorResult = ipAddressValidator(field);

    expect(validatorResult).toEqual({
      wrongAddressFormat: true,
    });
  });
});

describe('submaskValidator', () => {
  const createField = (submask = '') => {
    return new FormControl(submask);
  };

  test('should return null if submask is empty', () => {
    const field = createField();
    const validatorResult = submaskValidator(field);

    expect(validatorResult).toBeNull();
  });

  test('should return null if submask is in correct format', () => {
    const field = createField('255.255.0.0');
    const validatorResult = submaskValidator(field);

    expect(validatorResult).toBeNull();
  });

  const testCases = ['255.255.128.1', '255.255.1.1', '255.255.128', '255.1.255.128', '255.1.0.0'];

  test.for(testCases)('should return error if submask (%s) is in wrong format', () => {
    const field = createField('255.255.128.1');
    const validatorResult = submaskValidator(field);

    expect(validatorResult).toEqual({
      wrongSubmaskFormat: true,
    });
  });
});
