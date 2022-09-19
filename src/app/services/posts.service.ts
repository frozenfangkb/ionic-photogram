import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostsPaginatedResponse } from '../../models/Post';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postsPage = 0;

  constructor(private http: HttpClient) {}

  getPosts(reset = false): Observable<PostsPaginatedResponse> {
    if (reset) {
      this.postsPage = 0;
    }
    this.postsPage += 1;

    return this.http.get<PostsPaginatedResponse>(
      `${apiUrl}/post/?page=${this.postsPage}`
    );
  }
}
