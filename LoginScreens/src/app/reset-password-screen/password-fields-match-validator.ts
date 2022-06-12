import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordFieldsMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmedPassword = control.get('confirmedPassword');
  return password &&
    confirmedPassword &&
    password.value !== confirmedPassword.value
    ? { passwordsDoNotMatch: true }
    : null;
};
