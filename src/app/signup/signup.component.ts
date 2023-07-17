import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  signup() {
    // Make a POST request to the signup endpoint
    this.http.post('https://zomapp-e31x.onrender.com/signup', this.signupForm).subscribe((response: any) => {
      if (response.message === 'User signup successful') {
        // Signup success
        // Show a toast message
        alert('Signup successful');
        // Redirect to the login page
        this.router.navigate(['/login']);
      } else {
        // Signup failed
        // Show a toast message with the error
        alert(response.message);
      }
    });
  }
}
