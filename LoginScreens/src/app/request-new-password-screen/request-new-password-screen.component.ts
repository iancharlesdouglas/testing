import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { faIdBadge, faSignIn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-request-new-password-screen',
  templateUrl: './request-new-password-screen.component.html',
  styleUrls: ['./request-new-password-screen.component.css'],
})
export class RequestNewPasswordScreenComponent {
  requestForm: FormGroup;
  unrecognisedUser = false;
  idBadge = faIdBadge;
  faSignIn = faSignIn;

  constructor(private loginService: LoginService, private router: Router) {
    this.requestForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
    });
  }

  get username() {
    return this.requestForm?.get('username') || new FormControl('');
  }

  async requestNewPassword(): Promise<void> {
    const username = this.requestForm.get('username')?.value?.trim();
    const result = await this.loginService.requestNewPassword(username);
    this.unrecognisedUser = !result.userRecognised;
  }

  async logInScreen(): Promise<void> {
    this.router.navigate(['/login']);
  }
}
