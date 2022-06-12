import { Component, OnInit } from '@angular/core';
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
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.css'],
})
export class SignUpScreenComponent implements OnInit {
  signUpForm: FormGroup;
  nameAlreadyTaken = false;
  suggestedNames?: string[];
  faSignIn = faSignInAlt;
  faSignUp = faFileSignature;
  faReset = faPumpMedical;

  constructor(private loginService: LoginService, private router: Router) {
    this.signUpForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
        ]),
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

  ngOnInit(): void {}

  get username() {
    return this.signUpForm?.get('username') || new FormControl('');
  }

  get password() {
    return this.signUpForm?.get('password') || new FormControl('');
  }

  get confirmedPassword() {
    return this.signUpForm?.get('confirmedPassword') || new FormControl('');
  }

  async signUp(): Promise<void> {
    const username = this.signUpForm.get('username')?.value?.trim();
    const password = this.signUpForm.get('password')?.value?.trim();
    const signUp$ = this.loginService.signUp(username, password);
    signUp$.subscribe((result) => {
      if (result.successful) {
        this.router.navigate(['/login']);
      } else {
        this.nameAlreadyTaken = result.nameAlreadyTaken;
        const suggestions = result.suggestions?.filter(
          (name) => name && name.length > 0
        );
        this.suggestedNames = suggestions?.slice(0, 4);
      }
    });
  }

  async logIn(): Promise<void> {}
}
