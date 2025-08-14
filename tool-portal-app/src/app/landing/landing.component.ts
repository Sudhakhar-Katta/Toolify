import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../login/auth.service';

interface Tool{
  name:string;
  icon:string;
}


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  tools: Tool[] = [
  { name: 'Project',icon: 'assets/icons/internship_icons/Projects.png'},
  { name: 'Project Support',icon: 'assets/icons/internship_icons/Project_support.png'},
  { name: 'Project Downtime',icon: 'assets/icons/internship_icons/projects_downtime.png'},
  { name: 'Employee Details',icon: 'assets/icons/internship_icons/employee_details.png' },
  { name: 'Monthly Project Goals',icon: 'assets/icons/internship_icons/Monthly_Goals.png' },
  { name: 'Time Tracking',icon: 'assets/icons/internship_icons/time_tracking.png'},
  { name: 'Reports',icon: 'assets/icons/internship_icons/reports.png' },
  {name:'Teams',icon:'assets/icons/ngcf9b2fc9-b062-49ee-b17e-5ddcaa9a8c72.jpeg'}
];
  constructor(public auth: AuthService, private route: Router) {}

  goToLogin() {
    this.route.navigate(['/login']);
  }
    onToolClick(tool: Tool) {
    console.log('Clicked:', tool.name);
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }
}
