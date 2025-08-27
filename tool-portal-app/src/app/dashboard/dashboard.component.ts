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
    icon:string
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
  { name: 'Project',icon: 'assets/icons/internship_icons/Projects.png',route: '/tools/tool1' },
  { name: 'Project Support',icon: 'assets/icons/internship_icons/Project_support.png',route: '/tools/tool2' },
  { name: 'Project Downtime',icon: 'assets/icons/internship_icons/projects_downtime.png',route: '/tools/tool3' },
  { name: 'Employee Details',icon: 'assets/icons/internship_icons/employee_details.png',route: '/employee-list' },
  { name: 'Monthly Project Goals',icon: 'assets/icons/internship_icons/Monthly_Goals.png',route: '/tools/tool4' },
  { name: 'Time Tracking',icon: 'assets/icons/internship_icons/time_tracking.png',route: '/tools/tool5' },
  { name: 'PowerBI Reports',icon: 'assets/icons/internship_icons/reports.png',route: '/tools/powerbi-reports-list' },
  {name:'Teams',icon:'assets/icons/Adobe Express - file.png',route:''},
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