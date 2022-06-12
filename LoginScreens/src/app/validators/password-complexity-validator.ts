import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const passwordComplexityValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const complexityRegExp = new RegExp(
    /((?=.*\d)(?=(?:.*[a-z]){2})(?=.*[A-Z])(?=.*[@#$%]).{8,40})/
  );
  const complex = complexityRegExp.test(control?.value);

  return complex ? null : { tooSimple: true };
};
