import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Track whether or not loading screen is enabled
  isLoading = false;
  // Track error message to display to user
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    const username = loginForm.value.username;
    const password = loginForm.value.password;

    this.isLoading = true;
    this.authService.login(username, password).subscribe({
      next: () => {
        // Successful login
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        // Unsuccessful login - either unauthorized or server/API error
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = "Invalid username or password.";
        } else {
          this.errorMessage = "Looks like something went wrong! Please try again later.";
          console.log('Error when attempting login!', error);
        }
      }
    });
    loginForm.reset();
  }
}
