import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}

@Injectable({ providedIn: 'root' })
export class ScheduledPostService {
  private baseUrl = 'http://localhost:3000/api/scheduled-post';

  constructor(private http: HttpClient) {}

  list(): Observable<GeneratedScheduledPost[]> {
    return this.http.get<GeneratedScheduledPost[]>(this.baseUrl);
  }

  generate(payload: GenerateScheduledPostRequest = {}): Observable<GeneratedScheduledPost> {
    return this.http.post<GeneratedScheduledPost>(this.baseUrl, payload);
  }

  update(id: string, payload: UpdateScheduledPostRequest): Observable<GeneratedScheduledPost> {
    return this.http.patch<GeneratedScheduledPost>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
