import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginScreenComponent } from './login-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

describe('Login Screen', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;
  const loginService = {
    validate: jest.fn(),
  };
  const router = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginScreenComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
      ],
      providers: [
        { provide: LoginService, useValue: loginService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('Both user name and password must be supplied', async () => {
    component.loginForm.setValue({ username: '', password: '' });
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.setValue({ username: 'x', password: '' });
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.setValue({ username: '', password: 'x' });
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.setValue({ username: 'x', password: 'x' });
    expect(component.loginForm.valid).toBeTruthy();
  });

  test('Invalid user - cannot log in', async () => {
    const recognisedUser = 'John T. Recognised';
    const unrecognisedUser = 'John Doe';
    loginService.validate.mockImplementation((username) => ({
      userRecognised: username === recognisedUser,
    }));

    // Recognised user may log in
    component.loginForm.setValue({ username: recognisedUser, password: 'x' });

    await component.logIn();

    expect(component.unrecognisedUser).toBeFalsy();

    // Unrecognised user may not log in
    component.loginForm.setValue({
      username: unrecognisedUser,
      password: 'x',
    });

    await component.logIn();
    fixture.detectChanges();

    expect(component.unrecognisedUser).toBeTruthy();
    const error = fixture.debugElement.nativeElement.querySelector(
      '#unrecognisedUserError'
    );
    expect(error).toBeTruthy();
  });

  test('Invalid password - cannot log in', async () => {
    const validPassword = 'eiijf£4erfSU88*';
    const invalidPassword = 'password123';
    loginService.validate.mockImplementation((_username, password) => ({
      userRecognised: true,
      passwordValid: password === validPassword,
    }));

    // Valid password - may log in
    component.loginForm.setValue({ username: 'x', password: validPassword });

    await component.logIn();

    expect(component.unrecognisedUser).toBeFalsy();

    // Invalid password - may not log in
    component.loginForm.setValue({
      username: 'x',
      password: invalidPassword,
    });

    await component.logIn();
    fixture.detectChanges();

    expect(component.invalidPassword).toBeTruthy();
    const error = fixture.debugElement.nativeElement.querySelector(
      '#invalidPasswordError'
    );
    expect(error).toBeTruthy();
  });

  test('On successful login, user is taken to home screen', async () => {
    const validUsername = 'john.t.doe@doemail.com';
    const correctPassword = 'sj2fdw2"£ssii2uJJ7';
    loginService.validate.mockImplementation((username, password) => ({
      userRecognised: username === validUsername,
      validPassword: password === correctPassword,
    }));

    component.loginForm.setValue({
      username: validUsername,
      password: correctPassword,
    });

    await component.logIn();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  test('On unsuccessful login, password reset is suggested', async () => {
    const validUsername = 'john.t.doe@doemail.com';
    const correctPassword = 'sj2fdw2"£ssii2uJJ7';
    const incorrectPassword = 'Password1';
    loginService.validate.mockImplementation((username, password) => ({
      userRecognised: username === validUsername,
      validPassword: password === correctPassword,
    }));

    component.loginForm.setValue({
      username: validUsername,
      password: incorrectPassword,
    });

    await component.logIn();
    fixture.detectChanges();

    const error = fixture.debugElement.nativeElement.querySelector(
      '#unsuccessfulLoginError'
    );
    expect(error).toBeTruthy();
  });

  test('On three unsuccessful logins, account locked and suggestion shown: contact help desk', async () => {
    const validUsername = 'john.t.doe@doemail.com';
    const correctPassword = 'sj2fdw2"£ssii2uJJ7';
    const incorrectPassword = 'Password1';
    loginService.validate.mockImplementation((username, password) => ({
      userRecognised: username === validUsername,
      validPassword: password === correctPassword,
    }));

    component.loginForm.setValue({
      username: validUsername,
      password: incorrectPassword,
    });

    await component.logIn();
    await component.logIn();
    await component.logIn();
    fixture.detectChanges();

    const error = fixture.debugElement.nativeElement.querySelector(
      '#accountLockedError'
    );
    expect(error).toBeTruthy();
  });

  test('On selecting Reset Password the user is take to the Reset Password screen', async () => {
    await component.resetPassword();

    expect(router.navigate).toHaveBeenCalledWith(['/resetPassword']);
  });

  test('On selecting Sign Up the user is taken to the Sign Up screen', async () => {
    await component.signUp();

    expect(router.navigate).toHaveBeenCalledWith(['/signUp']);
  });
});
