import { isLoginCheck, isPasswordCheck } from './commands';

const createInput = (value: string) => {
  const newInput: HTMLInputElement = document.createElement('input');

  newInput.value = value;

  return newInput;
};

describe('Business logic: chek by valid user.', () => {
  it('chek by valid password.', () => {
    const newInput = createInput('qwer1234');

    expect(isPasswordCheck(newInput)).toBe(true);

    newInput.value = '1234';

    expect(isPasswordCheck(newInput)).toBe(false);
  });

  it('chek by valid login.', () => {
    const newInput = createInput('kastoev2001@gmail.com');
    expect(isLoginCheck(newInput)).toBe(true);

    newInput.value = 'kastoev2001';

    expect(isLoginCheck(newInput)).toBe(false);
  });
});
