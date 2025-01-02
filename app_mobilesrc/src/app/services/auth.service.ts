import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth'; // Update with your backend URL
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // User login
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password });
  }

  // Save token to localStorage
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Decode token to get user information
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.id; // Ensure your backend's JWT payload includes `id`
    }
    return null;
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Logout user
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
