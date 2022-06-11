import { Injectable } from '@angular/core';
import { LoginValidationResult } from './login-validation-result';

@Injectable({ providedIn: 'root' })
export class LoginService {
  async validate(
    username: string,
    password: string
  ): Promise<LoginValidationResult> {
    return { userRecognised: false, passwordValid: false };
  }
}
