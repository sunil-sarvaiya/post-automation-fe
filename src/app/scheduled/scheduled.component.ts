import { Component } from '@angular/core';

interface ScheduledPost {
  id: number;
  headline: string;
  contentType: string;
  platform: string;
  scheduledAt: string;
  status: 'approved' | 'draft' | 'review';
  priority: 'time-sensitive' | 'evergreen';
}

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent {
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  currentWeek = 'Jul 3 - Jul 9, 2026';

  scheduleGrid = [
    { day: 'Mon 3', posts: 1, items: ['10:00 AM - Trend Commentary → LinkedIn'] },
    { day: 'Tue 4', posts: 2, items: ['9:30 AM - Announcement → X', '2:00 PM - Thought Leadership → LinkedIn'] },
    { day: 'Wed 5', posts: 1, items: ['11:00 AM - Positioning → Facebook'] },
    { day: 'Thu 6', posts: 0, items: [] },
    { day: 'Fri 7', posts: 3, items: ['8:00 AM - Trend Commentary → Instagram', '12:00 PM - Announcement → LinkedIn', '4:00 PM - Thought Leadership → X'] },
    { day: 'Sat 8', posts: 0, items: [] },
    { day: 'Sun 9', posts: 0, items: [] }
  ];

  scheduledPosts: ScheduledPost[] = [
    { id: 1, headline: 'Why AI Agents Are the Next Big Thing', contentType: 'Trend Commentary', platform: 'LinkedIn', scheduledAt: 'Today 10:00 AM', status: 'approved', priority: 'time-sensitive' },
    { id: 2, headline: 'Product Update: Version 3.0 Release Notes', contentType: 'Announcement', platform: 'X', scheduledAt: 'Tomorrow 9:30 AM', status: 'approved', priority: 'time-sensitive' },
    { id: 3, headline: 'Building Resilient Automated Workflows', contentType: 'Thought Leadership', platform: 'LinkedIn', scheduledAt: 'Jul 5 2:00 PM', status: 'approved', priority: 'evergreen' },
    { id: 4, headline: 'How We Compare to Competitor Y in 2026', contentType: 'Positioning', platform: 'Facebook', scheduledAt: 'Jul 5 11:00 AM', status: 'review', priority: 'time-sensitive' },
    { id: 5, headline: 'Top 10 Automation Tools for SMBs', contentType: 'Thought Leadership', platform: 'Instagram', scheduledAt: 'Jul 7 8:00 AM', status: 'draft', priority: 'evergreen' },
    { id: 6, headline: 'Customer Success: ACME Corp Case Study', contentType: 'Announcement', platform: 'LinkedIn', scheduledAt: 'Jul 7 12:00 PM', status: 'approved', priority: 'evergreen' },
    { id: 7, headline: 'The State of Enterprise AI - Mid 2026', contentType: 'Thought Leadership', platform: 'X', scheduledAt: 'Jul 7 4:00 PM', status: 'draft', priority: 'evergreen' }
  ];

  getStatusBadge(status: string): string {
    switch (status) {
      case 'approved': return 'success';
      case 'draft': return 'secondary';
      case 'review': return 'warning';
      default: return 'secondary';
    }
  }

  getPriorityBadge(priority: string): string {
    return priority === 'time-sensitive' ? 'danger' : 'info';
  }
}
