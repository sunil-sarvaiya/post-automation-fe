import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  _id: string;
  platform: string;
  description: string;
  imageUrl: string | null;
  postId: string;
  postUrl: string;
  postedAt: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = 'http://localhost:3000/api/post';

  constructor(private http: HttpClient) {}

  getPosts(page: number, limit: number, platform?: string): Observable<PostsResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (platform) {
      params = params.set('platform', platform);
    }

    return this.http.get<PostsResponse>(this.baseUrl, { params });
  }

  createPost(description: string, platform?: string): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, { description, platform });
  }
}
