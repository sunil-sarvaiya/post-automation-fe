import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ScheduledPostService } from '../services/scheduled-post.service';

interface StatsCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: StatsCard[] = [
    { label: 'Total Posted', value: '...', change: 'Loading...', trend: 'up', icon: 'bi-check-circle' },
    { label: 'Pending Review', value: '...', change: 'Loading...', trend: 'up', icon: 'bi-clock' },
    { label: 'Scheduled', value: '...', change: 'Loading...', trend: 'up', icon: 'bi-calendar' },
  ];

  constructor(
    private postService: PostService,
    private scheduledPostService: ScheduledPostService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.loadTotalPosted();
    this.loadScheduledStats();
  }

  private loadTotalPosted(): void {
    this.postService.getPosts(1, 1).subscribe({
      next: (res) => {
        this.stats[0].value = res.total.toString();
        this.stats[0].change = `${res.total} published`;
        this.stats[0].trend = 'up';
      },
      error: () => {
        this.stats[0].value = '—';
        this.stats[0].change = 'Failed to load';
        this.stats[0].trend = 'down';
      }
    });
  }

  private loadScheduledStats(): void {
    this.scheduledPostService.list(1, 100).subscribe({
      next: (res) => {
        const posts = res.posts;
        const pending = posts.filter(p => p.status === 'Draft' || p.status === 'Approved').length;
        const scheduled = posts.filter(p => p.status === 'Approved').length;
        const totalScheduled = res.total;

        this.stats[1].value = pending.toString();
        this.stats[1].change = `${scheduled} ready to publish`;
        this.stats[1].trend = pending > 0 ? 'up' : 'down';

        this.stats[2].value = totalScheduled.toString();
        this.stats[2].change = `${posts.filter(p => p.status === 'Published').length} published`;
        this.stats[2].trend = totalScheduled > 0 ? 'up' : 'down';
      },
      error: () => {
        this.stats[1].value = '—';
        this.stats[1].change = 'Failed to load';
        this.stats[1].trend = 'down';
        this.stats[2].value = '—';
        this.stats[2].change = 'Failed to load';
        this.stats[2].trend = 'down';
      }
    });
  }
}
