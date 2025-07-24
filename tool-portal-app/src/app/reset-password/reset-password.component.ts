import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.email) {
      alert('Please enter a valid email.');
      return;
    }

    const payload = { email: this.email.trim() };

    this.http.post('https://localhost:7041/reset-password-email', payload)
      .subscribe({
        next: () => alert('✅ Reset link sent to your email.'),
        error: () => alert('✅ Reset link sent to your email.')
      });
  }
}
/* work on bug where if user enters valid email it should
say sucesfull or not successful, and right now even if it fails it
sends email
*/
