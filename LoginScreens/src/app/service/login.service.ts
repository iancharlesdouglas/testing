import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginValidationResult } from './login-validation-result';
import { PasswordResetValidationResult } from './password-reset-validation-result';
import { SignUpResult } from './sign-up-result';

@Injectable({ providedIn: 'root' })
export class LoginService {
  async validate(
    username: string,
    password: string
  ): Promise<LoginValidationResult> {
    return { userRecognised: false, passwordValid: false };
  }

  async resetPassword(
    username: string,
    password: string
  ): Promise<PasswordResetValidationResult> {
    return { successful: false };
  }

  signUp(username: string, password: string): Observable<SignUpResult> {
    return of({ successful: false, nameAlreadyTaken: false });
  }
}
