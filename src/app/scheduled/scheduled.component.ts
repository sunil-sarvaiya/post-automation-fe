import { Component, OnInit } from '@angular/core';
import { GeneratedScheduledPost, ScheduledPostService } from '../services/scheduled-post.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {
  filteredPosts: any[] = [];
  selectedPlatform = 'All';
  selectedStatus: any = 'All';
  platformFilterOptions = ['All', 'LinkedIn', 'Facebook', 'Instagram', 'X'];
  statusFilterOptions = ['All', 'Draft', 'Approved', 'Published', 'Failed'];
  showFilterDialog = false;
  isFilterApplied = false;
  isCreating = false;
  isLoading = false;
  createError: string | null = null;
  postingId: string | null = null;

  constructor(
    private scheduledPostService: ScheduledPostService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadScheduledPosts();
  }

  columns: any[] = [{ field: 'id', header: 'ID' }, { field: 'title', header: 'Title' }, { field: 'contentType', header: 'Content Type' }, { field: 'platform', header: 'Platform' }, { field: 'scheduledAt', header: 'Schedule Date' }, { field: 'status', header: 'Status' }
  ];

  scheduledPosts: any[] = [];

  loadScheduledPosts() {
    this.isLoading = true;
    this.scheduledPostService.list().subscribe({
      next: (docs) => {
        this.scheduledPosts = docs.map((doc) => this.toRow(doc));
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load scheduled posts', err);
        this.isLoading = false;
      }
    });
  }

  createScheduledPost() {
    this.isCreating = true;
    this.createError = null;

    this.scheduledPostService.generate({}).subscribe({
      next: () => {
        this.isCreating = false;
        this.loadScheduledPosts();
      },
      error: (err) => {
        console.error('Failed to generate scheduled post', err);
        this.createError = 'Failed to generate scheduled post. Please try again.';
        this.isCreating = false;
      }
    });
  }

  private toRow(doc: GeneratedScheduledPost) {
    return {
      id: doc._id,
      _id: doc._id,
      title: doc.title || doc.description?.slice(0, 60) || '',
      contentType: doc.imagePrompt ? 'AI Generated' : 'Manual',
      platform: doc.platform ? doc.platform.split(',').map((p) => p.trim()).filter(Boolean) : [],
      scheduledAt: doc.scheduledAt,
      status: doc.status,
      caption: doc.description || '',
      hashtags: (doc.hashtags || []).join(' '),
      image: doc.imageUrl || 'https://placehold.co/700x350/png?text=AI+Generated+Image'
    };
  }

  formatScheduledAt(iso: string): string {
    const date = new Date(iso);
    if (isNaN(date.getTime())) { return iso; }
    const datePart = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timePart = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${datePart} ${timePart}`;
  }

  getValue(row: any, field: keyof any) {
    return row[field];
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Approved': return 'success';
      case 'Draft': return 'secondary';
      case 'Published': return 'primary';
      case 'Failed': return 'danger';
      default: return 'secondary';
    }
  }

  deletePost(id: string) {
    if (!confirm('Delete this scheduled post?')) { return; }
    this.scheduledPostService.remove(id).subscribe({
      next: () => this.loadScheduledPosts(),
      error: (err) => console.error('Failed to delete scheduled post', err)
    });
  }

  postNow(post: any) {
    const platform = Array.isArray(post.platform) && post.platform.length ? post.platform[0] : 'linkedin';

    this.postingId = post._id;
    this.postService.createPost(post.caption, platform).subscribe({
      next: () => {
        this.scheduledPostService.update(post._id, { status: 'Published' }).subscribe({
          next: () => {
            this.postingId = null;
            this.loadScheduledPosts();
          },
          error: (err) => {
            console.error('Post succeeded but failed to update scheduled post status', err);
            this.postingId = null;
            this.loadScheduledPosts();
          }
        });
      },
      error: (err) => {
        console.error('Failed to post now', err);
        alert('Failed to post now. Please try again.');
        this.postingId = null;
      }
    });
  }

  applyFilter() {
    this.filteredPosts = this.scheduledPosts.filter(post => {
      const platformMatch = this.selectedPlatform === 'All' ||
        (Array.isArray(post.platform) ? post.platform.includes(this.selectedPlatform) : post.platform === this.selectedPlatform);
      const statusMatch = this.selectedStatus === 'All' || post.status === this.selectedStatus;
      return platformMatch && statusMatch;
    });
    this.isFilterApplied = this.selectedPlatform !== 'All' || this.selectedStatus !== 'All';
    this.closeFilter();
  }

  resetFilter() {
    this.selectedPlatform = 'All'; this.selectedStatus = 'All';
    this.filteredPosts = [...this.scheduledPosts];
    this.isFilterApplied = false;
    this.closeFilter();
  }

  openFilter() {
    this.showFilterDialog = true;
  }

  closeFilter() {
    this.showFilterDialog = false;
  }
}
