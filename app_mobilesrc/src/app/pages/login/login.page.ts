import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
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
rememberMe: any;

  constructor(private authService: AuthService, private router: Router, private navCtrl: NavController) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token); // Save token
        this.router.navigate(['/homepage']); // Navigate to home
      },
      (error) => {
        this.errorMessage = `Invalid email or password. <a href="#">Don't have an account? Register now!</a>`;
        // this.errorMessage = 'Don not have an account? Register now!';
        console.error('Login error:', error);
      }
      
    );
  }
  navigateToRegister() { 
    this.router.navigate(['/register']);
  }
}
