import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email:'',
    password: ''
  };

  constructor(private http: HttpClient,private router: Router) {}
  

  onSubmit() {
    const payload = {
      email: this.loginData.email.trim(),    
      password: this.loginData.password.trim()
    };

    console.log('🔍 Sending user input:', payload);

    this.http.post('https://localhost:7041/login', payload)
      .subscribe({
        next: (res: any) => {
          console.log('✅ Login successful', res);
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('❌ Login failed', err);
          alert('Invalid credentials.');
        }
      });
  }

  onResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}