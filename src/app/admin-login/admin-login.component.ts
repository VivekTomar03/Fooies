import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    // Make a POST request to the admin login endpoint
    this.http.post('https://zomapp-e31x.onrender.com/admin/login', this.loginForm).subscribe((response: any) => {
      if (response.message === 'Admin login successful') {
        // Admin login success
        // Show a toast message or perform any other actions
        alert(response.message);
        // Redirect to the admin dashboard
        this.router.navigate(['/admin-dashboard']);
      } else {
        // Admin login failed
        // Show a toast message or handle the error case
        alert(response.message);
      }
    });
  }
}
