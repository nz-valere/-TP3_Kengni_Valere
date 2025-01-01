import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token); // Save token
        this.router.navigate(['/home']); // Navigate to home
      },
      (error) => {
        this.errorMessage = 'Invalid email or password.';
        console.error('Login error:', error);
      }
    );
  }
}
