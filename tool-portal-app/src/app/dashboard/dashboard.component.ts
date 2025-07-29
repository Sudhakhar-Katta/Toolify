import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


interface Tool {
  name: string;
  route: string;
  description?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 tools: Tool[] = [
  { name: 'Project', route: '/tools/project' },
  { name: 'Production Support', route: '/tools/production-support' },
  { name: 'Production Downtime', route: '/tools/production-downtime' },
  { name: 'Employee Details', route: '/employee-list' }, 
  { name: 'Monthly Project Goals', route: '/tools/monthly-project-goals' },
  { name: 'Time Tracking', route: '/tools/time-tracking' }
];


  constructor(private router: Router) {}

  goToEmployeeList(): void {
    this.router.navigate(['/employee-list']);
  }

  // Optional: Handle tool card clicks with error handling
  navigateToTool(route: string): void {
    try {
      this.router.navigate([route]);
    } catch (error) {
      console.error('Navigation error:', error);
      // You could show a toast notification here
    }
  }
}