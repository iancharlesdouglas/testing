import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faBroom,
  faFileSignature,
  faSign,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  icon = faSign;
  faSignIn = faSignInAlt;
  faSignUp = faFileSignature;
  faReset = faBroom;
  unrecognisedUser = false;
  invalidPassword = false;
  accountLocked = false;
  private attempts = 0;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.loginForm?.get('username') || new FormControl('');
  }

  get password() {
    return this.loginForm?.get('password') || new FormControl('');
  }

  async logIn(): Promise<void> {
    if (this.loginForm.valid) {
      console.log(
        'login - username',
        this.loginForm.get('username')?.value?.trim()
      );
      console.log(
        'login - password',
        this.loginForm.get('password')?.value?.trim()
      );

      this.attempts += 1;
      const validationResult = await this.loginService.validate(
        this.loginForm.get('username')?.value?.trim(),
        this.loginForm.get('password')?.value?.trim()
      );
      this.unrecognisedUser = !validationResult.userRecognised;
      this.invalidPassword = !validationResult.passwordValid;
      if (validationResult.userRecognised && validationResult.passwordValid) {
        this.router.navigate(['/']);
      } else if (this.attempts === 3) {
        this.accountLocked = true;
      }
    }
  }
}
