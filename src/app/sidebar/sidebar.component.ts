import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  tabs = [
    { label: 'Dashboard', route: '/home/dashboard', icon: 'bi-grid-fill' },
    { label: 'Posted', route: '/home/posted', icon: 'bi-check-circle-fill' },
    { label: 'Scheduled Posts', route: '/home/scheduled', icon: 'bi-calendar-event-fill' }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
