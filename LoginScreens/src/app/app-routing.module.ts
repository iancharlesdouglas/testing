import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ResetPasswordScreenComponent } from './reset-password-screen/reset-password-screen.component';
import { SignUpScreenComponent } from './sign-up-screen/sign-up-screen.component';

const routes: Routes = [
  { path: 'login', component: LoginScreenComponent },
  { path: 'resetPassword', component: ResetPasswordScreenComponent },
  { path: 'signUp', component: SignUpScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
