import { Component } from '@angular/core';
import {Router,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tools = [

      { name: 'Tool 1', route: '/tools/tool1' },
      { name: 'Tool 2', route: '/tools/tool2' },  
      { name: 'Tool 3', route: '/tools/tool3' },
      { name: 'Tool 4', route: '/tools/tool4' },
      { name: 'Tool 5', route: '/tools/tool5' },
      { name: 'Tool 6', route: '/tools/tool6' }

  ];
}
