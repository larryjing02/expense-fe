import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private authService: AuthService) {}

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }

    const username = loginForm.value.username;
    const password = loginForm.value.password;
    console.log(`Attempting to log in username: ${username} password:${password}`)

    this.authService.login(username, password)
      .subscribe({
        next: success => {
          if (success) {
            console.log('Login successful!');
            // You could also redirect the user to a different page here.
          } else {
            console.log('Login failed!');
          }
        },
        error: error => {
          console.log('Login error!', error);
        }
      });


    loginForm.reset();
  }
}
