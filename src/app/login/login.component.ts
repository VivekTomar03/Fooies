import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) {}
    
  login() {
    // Make a POST request to the login endpoint
    this.http.post('https://zomapp-e31x.onrender.com/login', this.loginForm).subscribe((response: any) => {
     if(response){
      localStorage.setItem('username', this.loginForm.username);

      this.router.navigate(['/menu']);
    } 
      
    if (response.message === 'Login successful') {
        // Login success
        // Show a toast message
        
        alert('Login successful');
        // Redirect to the home page
        
      } else {
        // Login failed
        // Show a toast message with the error
        alert(response.message);
      }
    });
  
  }
}
