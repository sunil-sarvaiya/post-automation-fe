import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GeneratedScheduledPost, ScheduledPostService } from '../services/scheduled-post.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {
  selectedStatus: any = 'All';
  statusFilterOptions = ['All', 'Draft', 'Approved', 'Published', 'Failed'];
  showFilterDialog = false;
  isFilterApplied = false;
  isCreating = false;
  isLoading = false;
  createError: string | null = null;
  postingId: string | null = null;
  showDetailDialog = false;
  selectedPost: any = null;

  total = 0;
  page = 1;
  limit = 5;
  totalPages = 0;

  constructor(
    private scheduledPostService: ScheduledPostService,
    private postService: PostService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadScheduledPosts();
  }

  columns: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'caption', header: 'Caption' },
    { field: 'scheduledAt', header: 'Schedule Date' },
    { field: 'publishedAt', header: 'Published At' },
    { field: 'status', header: 'Status' }
  ];

  scheduledPosts: any[] = [];

  loadScheduledPosts() {
    this.isLoading = true;
    const status = this.isFilterApplied && this.selectedStatus !== 'All' ? this.selectedStatus : undefined;
    this.scheduledPostService.list(this.page, this.limit, status).subscribe({
      next: (res) => {
        this.scheduledPosts = res.posts.map((doc) => this.toRow(doc));
        this.total = res.total;
        this.totalPages = res.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load scheduled posts', err);
        this.isLoading = false;
      }
    });
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages || p === this.page) {
      return;
    }
    this.page = p;
    this.loadScheduledPosts();
  }

  createScheduledPost() {
    this.isCreating = true;
    this.createError = null;

    this.scheduledPostService.generate({}).subscribe({
      next: () => {
        this.isCreating = false;
        this.page = 1;
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
      _id: doc._id,
      title: doc.title || doc.description?.slice(0, 60) || '',
      scheduledAt: doc.scheduledAt,
      status: doc.status,
      caption: (doc.description || '').slice(0, 120) + ((doc.description || '').length > 120 ? '...' : ''),
      image: doc.imageUrl || '',
      description: doc.description || '',
      hashtags: doc.hashtags || [],
      imagePrompt: doc.imagePrompt,
      platform: doc.platform || '',
      generatedAt: doc.generatedAt,
      publishedAt: doc.publishedAt,
      postUrl: doc.postUrl,
      postId: doc.postId,
      retryCount: doc.retryCount,
      errorMessage: doc.errorMessage,
      isPublishing: doc.isPublishing
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

  openDetail(row: any) {
    this.selectedPost = row;
    this.showDetailDialog = true;
  }

  closeDetail() {
    this.showDetailDialog = false;
    this.selectedPost = null;
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  postNow(post: any) {
    this.postingId = post._id;
    this.postService.createPost(post.caption || post.title, 'linkedin', post.image || undefined).subscribe({
      next: (res) => {
        this.scheduledPostService.update(post._id, {
          status: 'Published',
          publishedAt: res.postedAt || new Date().toISOString(),
          postId: res.postId,
          postUrl: res.postUrl
        }).subscribe({
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
    this.page = 1;
    this.isFilterApplied = this.selectedStatus !== 'All';
    this.loadScheduledPosts();
    this.closeFilter();
  }

  resetFilter() {
    this.selectedStatus = 'All';
    this.isFilterApplied = false;
    this.page = 1;
    this.loadScheduledPosts();
    this.closeFilter();
  }

  openFilter() {
    this.showFilterDialog = true;
  }

  closeFilter() {
    this.showFilterDialog = false;
  }
}
