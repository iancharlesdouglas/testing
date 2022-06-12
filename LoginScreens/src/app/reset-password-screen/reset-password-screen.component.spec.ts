import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { ResetPasswordScreenComponent } from './reset-password-screen.component';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

describe('Reset Password Screen', () => {
  let component: ResetPasswordScreenComponent;
  let fixture: ComponentFixture<ResetPasswordScreenComponent>;
  const loginService = {
    resetPassword: jest.fn(),
  };
  const router = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordScreenComponent],
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
    fixture = TestBed.createComponent(ResetPasswordScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('Password and confirmed password must match', async () => {
    component.passwordForm.setValue({
      password: '1qQ@a123',
      confirmedPassword: '1qQ@a124',
    });
    fixture.detectChanges();

    expect(component.passwordForm.valid).toBeFalsy();
  });

  test('Password must contain 8 letters with 1 digit, 2 lowercase, 1 uppercase and 1 symbol - at least 8 letters long', async () => {
    const shortComplexPassword = '1qQ@a123';
    const tooShortComplexPassword = '1qQ@a12';
    const tooSimplePassword = '1qQ@Q123';

    // Short complex password should be accepted
    component.passwordForm.setValue({
      password: shortComplexPassword,
      confirmedPassword: shortComplexPassword,
    });
    fixture.detectChanges();

    expect(component.passwordForm.valid).toBeTruthy();

    // Too-short complex password should be rejected
    component.passwordForm.setValue({
      password: tooShortComplexPassword,
      confirmedPassword: tooShortComplexPassword,
    });
    fixture.detectChanges();

    expect(component.passwordForm.valid).toBeFalsy();

    // Insuff. complex password shoudl be rejected
    component.passwordForm.setValue({
      password: tooSimplePassword,
      confirmedPassword: tooSimplePassword,
    });
    fixture.detectChanges();

    expect(component.passwordForm.valid).toBeFalsy();
  });

  test('Password cannot be more than 40 characters long', async () => {
    const complexPassword16 = '1qQ@a1235uG*321s';
    const tooLongPassword48 = `${complexPassword16}${complexPassword16}${complexPassword16}`;

    // 16-char. complex password should be accepted
    component.passwordForm.setValue({
      password: complexPassword16,
      confirmedPassword: complexPassword16,
    });
    fixture.detectChanges();

    expect(component.passwordForm.valid).toBeTruthy();

    // 48-char. complex password should be rejected
    component.passwordForm.setValue({
      password: tooLongPassword48,
      confirmedPassword: tooLongPassword48,
    });
    fixture.detectChanges();

    expect(component.passwordForm.valid).toBeFalsy();
  });

  test('After resetting their password, the user is taken to the Login screen', async () => {
    const complexPassword16 = '1qQ@a1235uG*321s';
    loginService.resetPassword.mockImplementation((password, confirmed) => ({
      successful: true,
    }));

    component.passwordForm.setValue({
      password: complexPassword16,
      confirmedPassword: complexPassword16,
    });

    await component.resetPassword();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  test('On selecting Login Screen the user is taken to the Login screen', async () => {
    throw new Error('Not implemented');
  });
});
