import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post, PostService } from '../services/post.service';

export interface TableColumn {
  field: keyof Post;
  header: string;
}

@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {

  filterForm = new FormGroup({
    platform: new FormControl('')
  });

  platformOptions = [
    { label: 'All Platforms', value: '' },
    { label: 'LinkedIn', value: 'linkedin' }
  ];

  columns: TableColumn[] = [
    { field: 'platform', header: 'Platform' },
    { field: 'description', header: 'Description' },
    { field: 'postedAt', header: 'Posted At' }
  ];

  posts: Post[] = [];
  total = 0;
  page = 1;
  limit = 5;
  totalPages = 0;
  loading = false;
  error = '';

  displayPreview = false;
  selectedPost!: Post;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();

    this.filterForm.get('platform')?.valueChanges.subscribe(() => {
      this.page = 1;
      this.loadPosts();
    });
  }

  loadPosts(): void {
    this.loading = true;
    this.error = '';
    const platform = this.filterForm.get('platform')?.value || undefined;

    this.postService.getPosts(this.page, this.limit, platform).subscribe({
      next: (res) => {
        this.posts = res.posts;
        this.total = res.total;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load posts';
        this.loading = false;
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
    this.loadPosts();
  }

  getValue(row: Post, field: keyof Post) {
    return row[field];
  }

  openPreview(post: Post): void {
    this.selectedPost = post;
    this.displayPreview = true;
  }

  closePreview(): void {
    this.displayPreview = false;
  }

}
