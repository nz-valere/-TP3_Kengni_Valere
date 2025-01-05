import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RouterLink, Routes } from '@angular/router';
import { RegisterPage } from '../register/register.page';

const routes: Routes = [
  { path: 'register', component: RegisterPage },
  // Other routes
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RouterLink
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
