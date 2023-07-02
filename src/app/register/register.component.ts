import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  isLoading: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(registerForm: NgForm) {
    if (!registerForm.valid) {
      return;
    }

    const firstname = registerForm.value.firstName;
    const lastname = registerForm.value.lastName;
    const username = registerForm.value.username;
    const password = registerForm.value.password;

    this.isLoading = true;
    this.authService.register(username, password, firstname, lastname).subscribe({
      next: () => {
        // Successful registration
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        // Unsuccessful registration - either unauthorized or server/API error
        this.isLoading = false;
        if (error.status === 409) {
          this.errorMessage = "Username already exists.";
        } else {
          this.errorMessage = "Looks like something went wrong! Please try again later.";
          console.log('Error when attempting registration!', error);
        }
      }
    });
    registerForm.reset();
  }
}
