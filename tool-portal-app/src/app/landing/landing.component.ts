import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  tools = [
    { name: 'Tool 1', route: '/tools/tool1' },
    { name: 'Tool 2', route: '/tools/tool2' },
    { name: 'Tool 3', route: '/tools/tool3' },
    { name: 'Tool 4', route: '/tools/tool4' },
    { name: 'Tool 5', route: '/tools/tool5' },
    { name: 'Tool 6', route: '/tools/tool6' }
  ];

  constructor(public auth: AuthService, private route: Router) {}

  goToLogin() {
    this.route.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }
}
