import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordFieldsMatchValidator } from '../validators/password-fields-match-validator';
import { passwordComplexityValidator } from '../validators/password-complexity-validator';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import {
  faFileSignature,
  faPumpMedical,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password-screen.component.html',
  styleUrls: ['./reset-password-screen.component.css'],
})
export class ResetPasswordScreenComponent {
  passwordForm: FormGroup;
  faSignIn = faSignInAlt;
  faSignUp = faFileSignature;
  faReset = faPumpMedical;

  constructor(private loginService: LoginService, private router: Router) {
    this.passwordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          passwordComplexityValidator,
          Validators.minLength(8),
          Validators.maxLength(40),
        ]),
        confirmedPassword: new FormControl('', [
          Validators.required,
          passwordComplexityValidator,
          Validators.minLength(8),
          Validators.maxLength(40),
        ]),
      },
      {
        validators: passwordFieldsMatchValidator,
      }
    );
  }

  get password() {
    return this.passwordForm?.get('password') || new FormControl('');
  }

  get confirmedPassword() {
    return this.passwordForm?.get('confirmedPassword') || new FormControl('');
  }

  async resetPassword(): Promise<void> {
    if (this.passwordForm.valid) {
      const resetResult = await this.loginService.resetPassword(
        '',
        this.passwordForm.get('password')?.value?.trim()
      );
      if (resetResult.successful) {
        this.router.navigate(['/login']);
      }
    }
  }

  async logInScreen(): Promise<void> {
    throw new Error('Not implemented');
  }
}
