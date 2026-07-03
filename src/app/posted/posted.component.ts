import { Component } from '@angular/core';

interface PostedPost {
  id: number;
  headline: string;
  content: string;
  source: string;
  contentType: string;
  platform: string;
  publishedAt: string;
  likes: number;
  comments: number;
  shares: number;
  engagement: string;
  status: 'high' | 'good' | 'low';
}

@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent {
  posts: PostedPost[] = [
    { id: 1, headline: 'AI in Enterprise: The Next Frontier', content: 'Our take on how enterprises are adopting AI tools to streamline operations...', source: 'Industry Report', contentType: 'Thought Leadership', platform: 'LinkedIn', publishedAt: '2026-07-03 09:30', likes: 342, comments: 28, shares: 89, engagement: '5.2%', status: 'high' },
    { id: 2, headline: 'We just launched our new analytics dashboard', content: 'Excited to announce real-time analytics with AI-powered insights...', source: 'Company News', contentType: 'Announcement', platform: 'X', publishedAt: '2026-07-02 14:00', likes: 187, comments: 15, shares: 43, engagement: '3.8%', status: 'good' },
    { id: 3, headline: 'The rise of no-code automation platforms', content: 'Why businesses are moving toward no-code solutions for their workflow...', source: 'TechCrunch', contentType: 'Trend Commentary', platform: 'LinkedIn', publishedAt: '2026-07-02 11:15', likes: 256, comments: 31, shares: 67, engagement: '4.5%', status: 'high' },
    { id: 4, headline: 'Comparing our solution with Competitor X', content: 'A fair look at how we stack up in enterprise automation...', source: 'Competitor Alert', contentType: 'Positioning', platform: 'Facebook', publishedAt: '2026-07-01 16:45', likes: 98, comments: 12, shares: 21, engagement: '2.1%', status: 'low' },
    { id: 5, headline: '5 Automation Trends Shaping 2026', content: 'From AI agents to hyperautomation — here is what matters...', source: 'Industry News', contentType: 'Thought Leadership', platform: 'Instagram', publishedAt: '2026-07-01 10:00', likes: 523, comments: 45, shares: 112, engagement: '6.7%', status: 'high' },
    { id: 6, headline: 'New integration: Salesforce Connector v2', content: 'Deeper Salesforce integration with bi-directional sync now available...', source: 'Product Team', contentType: 'Announcement', platform: 'LinkedIn', publishedAt: '2026-06-30 09:00', likes: 134, comments: 8, shares: 29, engagement: '2.8%', status: 'good' }
  ];

  getStatusBadge(status: string): string {
    switch (status) {
      case 'high': return 'success';
      case 'good': return 'primary';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  }
}
