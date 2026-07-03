import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  tabs = [
    { label: 'Dashboard', route: '/home/dashboard' },
    { label: 'Posted', route: '/home/posted' },
    { label: 'Scheduled Posts', route: '/home/scheduled' }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
