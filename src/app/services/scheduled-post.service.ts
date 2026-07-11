import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GeneratedScheduledPost {
  _id: string;
  title: string;
  description: string;
  hashtags: string[];
  imagePrompt: string | null;
  platform: string;
  imageUrl: string | null;
  scheduledAt: string;
  status: string;
  generatedAt: string | null;
  isPublishing: boolean;
  platformResponse: any | null;
  postId: string | null;
  postUrl: string | null;
  publishedAt: string | null;
  retryCount: number;
  errorMessage: string | null;
  approvedAt: string | null;
}

export interface ScheduledPostsResponse {
  posts: GeneratedScheduledPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GenerateScheduledPostRequest {
  platform?: string;
  scheduledAt?: string;
  title?: string;
}

export interface UpdateScheduledPostRequest {
  title?: string;
  description?: string;
  hashtags?: string[];
  imagePrompt?: string | null;
  platform?: string;
  imageUrl?: string | null;
  scheduledAt?: string;
  status?: string;
  publishedAt?: string;
  postId?: string | null;
  postUrl?: string | null;
  approvedAt?: string;
}

export interface ManualPostRequest {
  title: string;
  description: string;
  url: string;
  source: string;
}

@Injectable({ providedIn: 'root' })
export class ScheduledPostService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  list(page: number = 1, limit: number = 10, status?: string): Observable<ScheduledPostsResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<ScheduledPostsResponse>(`${this.baseUrl}/scheduled-post`, { params });
  }

  generate(payload: GenerateScheduledPostRequest = {}): Observable<GeneratedScheduledPost> {
    return this.http.post<GeneratedScheduledPost>(`${this.baseUrl}/scheduled-post`, payload);
  }

  update(id: string, payload: UpdateScheduledPostRequest): Observable<GeneratedScheduledPost> {
    return this.http.patch<GeneratedScheduledPost>(`${this.baseUrl}/scheduled-post/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/scheduled-post/${id}`);
  }

  manualPost(payload: ManualPostRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/manual-post`, payload);
  }
}
