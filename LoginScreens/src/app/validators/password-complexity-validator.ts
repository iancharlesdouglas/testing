import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import regx from 'regx';

export const passwordComplexityValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const complexityRegExp = new RegExp(regx('gm')`
    ((?=.*\d)                // at east one digit
    (?=(?:.*[a-z]){2})       // at least 2 lower-case characters
    (?=.*[A-Z])              // at least one upper-case characters
    (?=.*[@#$%])             // at least one special character
    .{8,40})                 // at least 8 and at most 40 characters
    `);

  const isComplex = complexityRegExp.test(control?.value);

  return isComplex ? null : { tooSimple: true };
};
