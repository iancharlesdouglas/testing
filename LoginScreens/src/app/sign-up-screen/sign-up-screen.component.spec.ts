import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SignUpScreenComponent } from './sign-up-screen.component';
import { LoginService } from '../service/login.service';
import { of } from 'rxjs';

describe('Sign Up Screen', () => {
  let component: SignUpScreenComponent;
  let fixture: ComponentFixture<SignUpScreenComponent>;
  const loginService = {
    signUp: jest.fn(),
  };
  const router = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpScreenComponent],
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
    fixture = TestBed.createComponent(SignUpScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('If the user name is already taken, a list of up to 4 suggested user names is shown', async () => {
    loginService.signUp.mockReturnValue(
      of({
        successful: false,
        nameAlreadyTaken: true,
        suggestions: [
          'johndoe1',
          'john_doe_1',
          'j_doe_1',
          '',
          'jdoe123',
          'jondoe_1',
        ],
      })
    );

    component.signUp();
    fixture.detectChanges();

    const suggestedNamesList = fixture.debugElement.nativeElement.querySelector(
      '#suggestedNamesList'
    );
    expect(suggestedNamesList).toBeTruthy();
    expect(suggestedNamesList.children.length).toBe(4);
  });
});
