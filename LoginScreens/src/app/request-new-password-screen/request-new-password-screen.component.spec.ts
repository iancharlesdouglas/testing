import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestNewPasswordScreenComponent } from './request-new-password-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

describe('Request New Password Screen', () => {
  let component: RequestNewPasswordScreenComponent;
  let fixture: ComponentFixture<RequestNewPasswordScreenComponent>;
  const loginService = {
    requestNewPassword: jest.fn(),
  };
  const router = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestNewPasswordScreenComponent],
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
    fixture = TestBed.createComponent(RequestNewPasswordScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('User name must be supplied', async () => {
    component.requestForm.setValue({ username: '' });
    expect(component.requestForm.valid).toBeFalsy();

    component.requestForm.setValue({ username: 'x' });
    expect(component.requestForm.valid).toBeTruthy();
  });

  test('Invalid user name - cannot request new password', async () => {
    const recognisedUser = 'Johndoe01';
    const unrecognisedUser = 'Someinvaliduser';
    loginService.requestNewPassword.mockImplementation((username) => ({
      userRecognised: username === recognisedUser,
    }));

    // Recognised user may log in
    component.requestForm.setValue({ username: recognisedUser });

    await component.requestNewPassword();

    expect(component.unrecognisedUser).toBeFalsy();

    // Unrecognised user may not log in
    component.requestForm.setValue({
      username: unrecognisedUser,
    });

    await component.requestNewPassword();
    fixture.detectChanges();

    expect(component.unrecognisedUser).toBeTruthy();
    const error = fixture.debugElement.nativeElement.querySelector(
      '#unrecognisedUserError'
    );
    expect(error).toBeTruthy();
  });
});
