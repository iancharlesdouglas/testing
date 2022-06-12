import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ResetPasswordScreenComponent } from './reset-password-screen/reset-password-screen.component';
import { SignUpScreenComponent } from './sign-up-screen/sign-up-screen.component';
import { RequestNewPasswordScreenComponent } from './request-new-password-screen/request-new-password-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    ResetPasswordScreenComponent,
    SignUpScreenComponent,
    RequestNewPasswordScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
