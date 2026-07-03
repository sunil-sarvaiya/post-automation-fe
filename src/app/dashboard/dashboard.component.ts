import { Component } from '@angular/core';

interface StatsCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

interface ReviewItem {
  id: number;
  source: string;
  headline: string;
  relevanceScore: number;
  contentType: string;
  urgency: 'high' | 'normal' | 'low';
  receivedAt: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats: StatsCard[] = [
    { label: 'Total Posted', value: '147', change: '+12 this week', trend: 'up', icon: 'bi-check-circle' },
    { label: 'Pending Review', value: '8', change: '3 high priority', trend: 'up', icon: 'bi-clock' },
    { label: 'Scheduled', value: '23', change: 'Next: Today 3pm', trend: 'up', icon: 'bi-calendar' },
  ];

  reviewQueue: ReviewItem[] = [
    { id: 1, source: 'TechCrunch', headline: 'OpenAI launches GPT-5 with reasoning capabilities', relevanceScore: 94, contentType: 'Trend Commentary', urgency: 'high', receivedAt: '10 min ago' },
    { id: 2, source: 'Industry News', headline: 'New data privacy regulations take effect in EU', relevanceScore: 87, contentType: 'Thought Leadership', urgency: 'high', receivedAt: '25 min ago' },
    { id: 3, source: 'Competitor Alert', headline: 'Competitor X announces AI-powered analytics suite', relevanceScore: 82, contentType: 'Positioning', urgency: 'high', receivedAt: '1 hour ago' },
    { id: 4, source: 'Google Trends', headline: '"Automation tools" search volume spikes 240%', relevanceScore: 79, contentType: 'Trend Commentary', urgency: 'normal', receivedAt: '2 hours ago' },
    { id: 5, source: 'Company Feed', headline: 'New integration with Salesforce announced', relevanceScore: 96, contentType: 'Announcement', urgency: 'normal', receivedAt: '3 hours ago' }
  ];

  recentPipeline = [
    { action: 'Scraped 47 new items', time: '5 min ago', status: 'done' },
    { action: 'Normalized & deduped → 32 items', time: '4 min ago', status: 'done' },
    { action: 'Content Strategy scored → 8 passed threshold', time: '3 min ago', status: 'done' },
    { action: 'Generated 5 drafts for review', time: '2 min ago', status: 'done' },
    { action: 'Published "AI in Enterprise" to LinkedIn', time: '15 min ago', status: 'done' },
    { action: 'Scheduling 3 posts for optimal times', time: 'just now', status: 'active' }
  ];

  getScoreClass(score: number): string {
    if (score >= 90) return 'success';
    if (score >= 80) return 'primary';
    if (score >= 70) return 'warning';
    return 'danger';
  }

  getUrgencyBadge(urgency: string): string {
    switch (urgency) {
      case 'high': return 'danger';
      case 'normal': return 'primary';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  }
}
