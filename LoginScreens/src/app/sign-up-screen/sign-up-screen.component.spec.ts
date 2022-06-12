import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpScreenComponent } from './sign-up-screen.component';

describe('SignUpScreenComponent', () => {
  let component: SignUpScreenComponent;
  let fixture: ComponentFixture<SignUpScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpScreenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('If the user name is already taken, a list of up to 4 suggested user names is shown', async () => {
    throw new Error('Not implemented');
  });
});
